import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { MediaService } from './media.service';
import { RtvService } from './rtv.service';
import { FrontMedia, MediaDto } from './schema/media.model';

@Controller('media')
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
    private readonly rtvService: RtvService
  ) {
  }

  @Get()
  async findAll(): Promise<FrontMedia> {
    return this.mediaService.getAll();
  }

  @Get('docs')
  async getDocs(): Promise<MediaDto[]> {
    return this.mediaService.getDocs();
  }

  @Get('movies')
  async getMovies(): Promise<MediaDto[]> {
    return this.mediaService.getMovies();
  }

  @Get('getShows')
  async getNewShows(): Promise<any> {

    const allShows = await this.rtvService.getAllShows();
    const shows = this.selectShows(allShows);

    this.searchAndSaveSingeShow(shows, 'DOCUMENTARY');

  }

  @Get('rtv/:id')
  async getShowById(@Param('id') id: string): Promise<any> {
    return await this.rtvService.getSingleVideo(id);
  }

  @Get('find/:id')
  async findShowById(@Param('id') id: string): Promise<MediaDto> {
    return this.mediaService.findOne(id);
  }

  @Get('update')
  async update(): Promise<MediaDto[]> {
    return this.mediaService.updateAll();
  }

  @Get('getMovies')
  async getNewMovies(): Promise<any> {

    const allMovies = await this.rtvService.getAllMovies();
    const shows = this.selectMovies(allMovies);

    this.searchAndSaveSingeShow(shows, 'MOVIE');

  }

  @Post('search')
  async searchQuery(@Body() query: { search: string }): Promise<MediaDto[]> {
    return this.mediaService.search(query.search);
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

  private selectMovies(data: any): any[] {
    const movies = [];

    data.recordings.forEach(recording => {
      // search for foreign movies
      if (recording.stub === 'tuji-filmi') {
        movies.push({
          title: recording.title,
          id: recording.id
        });
      }
    });

    return movies;

  }

  private async searchAndSaveSingeShow(shows, showType: 'MOVIE' | 'DOCUMENTARY') {

    // setting random delay on each request
    const delayedRequest = (show) => {
      return new Promise((resolve, reject) => setTimeout(() => {

        this.rtvService.getSingleVideo(show.id)
          .then(res => {

            // find the high bitrate video
            let episode = res.mediaFiles.find(item => item.height === 720);

            if (!episode) {
              episode = res.mediaFiles[0];
            }

            if (!episode) {
              console.log('No .mp4');
              console.log('Recording ID: ', show.id);
              return;
            }

            const mediaData: MediaDto = {
              title: res.title,
              link: episode.streamers.http + episode.filename,
              recordingId: res.id,
              description: res.description,
              createdAt: new Date(res.broadcastDate),
              type: showType,
              response: res
            };

            // save to db
            this.mediaService.create(mediaData);
            resolve();

          })
          .catch((error) => {
            console.log('Error: ', error);
            console.log('RecordingID: ', show.id);
            reject();
          });

      }, Math.random() * 10000));
    };

    for (const show of shows) {
      await delayedRequest(show);
    }
  }

}
