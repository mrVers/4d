import { Controller, Get, Param } from '@nestjs/common';
import { MediaService } from './media.service';
import { RtvService } from './rtv.service';
import { MediaDto } from './schema/media.model';

@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly rtvService: RtvService
  ) {
  }

  @Get()
  async findAll(): Promise<MediaDto[]> {
    return this.mediaService.findAll();
  }

  @Get('rtv')
  async getNewShows(): Promise<any> {

    const allShows = await this.rtvService.getAllShows();
    const shows = this.selectShows(allShows);

    const promises = [];
    const episodes: any = [];

    shows.forEach((show) => {
      promises.push(
        this.rtvService.getSingleVideo(show.id)
          .then(res => {

            // find the high bitrate video
            let episode = res.mediaFiles.find(item => item.height === 720);

            if (!episode) {
              episode = res.mediaFiles[0];
            }

            if (!episode) {
              console.log('No .mp4');
              return;
            }

            const mediaData: MediaDto = {
              title: res.title,
              link: episode.streamers.http + episode.filename,
              recordingId: res.id,
              description: res.description,
              response: res
            };

            // push to episodes array
            episodes.push(mediaData);
            // save to db
            this.mediaService.create(mediaData);

          })
          .catch((error) => {
            console.log('Error: ', error);
            // todo: log errors to file : show.id, error
          }),
      );
    });

    return Promise.all(promises).then(() => episodes);
  }

  private selectShows(data: any): any[] {
    const shows = [];

    data.recordings.forEach(recording => {
      // search for foreign documentaries
      if (recording.stub === 'tuji-dokumentarni-filmi-in-oddaje' || recording.geoblocked === '1') {
        shows.push({
          title: recording.title,
          id: recording.id,
        });
      }
    });

    return shows;

  }

  @Get('rtv/:id')
  async getShowById(@Param('id') id: string): Promise<any> {
    return await this.rtvService.getSingleVideo(id);
  }

  @Get('find/:id')
  async findShowById(@Param('id') id: string): Promise<MediaDto[]> {
    return this.mediaService.findOne(id);
  }
}
