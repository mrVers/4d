import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { FrontMedia, Media, MediaDto } from './schema/media.model';
import { RtvService } from './rtv.service';

@Injectable()
export class MediaService {

  constructor(
    @Inject('MEDIA_MODEL') private readonly mediaModel: Model<Media>,
    private readonly rtvService: RtvService
  ) {
  }

  async create(createMedia: MediaDto): Promise<Media> {

    const episode = await this.mediaModel.findOne({ recordingId: createMedia.recordingId });

    if (!episode) {
      // save episode
      const createdMedia = new this.mediaModel(createMedia);
      return await createdMedia.save();
    } else {
      // update airtime date
      return await episode.updateOne({
        createdAt : createMedia.createdAt,
        $set: { 'response.date': createMedia.response.date }
      });
    }
  }

  async getAll(): Promise<FrontMedia> {
    return {
      shows: await this.mediaModel.find({ type: 'DOCUMENTARY' }).sort({ createdAt: -1 }).limit(16),
      movies: await this.mediaModel.find({ type: 'MOVIE' }).sort({ createdAt: -1 }).limit(16),
    };
  }

  async findOne(id: any): Promise<Media> {
    id = Number(id);
    return await this.mediaModel.findOne({ 'response.id': id });
  }

  async getDocs(): Promise<Media[]> {
    return await this.mediaModel.find({ type: 'DOCUMENTARY' }).sort({ createdAt: -1 });
  }

  async getMovies(): Promise<Media[]> {
    return await this.mediaModel.find({ type: 'MOVIE' }).sort({ createdAt: -1 });
  }

  async search(query: string): Promise<Media[]> {
    return await this.mediaModel.find({
      $or: [
        { title: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    });
  }

  async fetchNewShows(): Promise<string> {
    const allShows = await this.rtvService.getAllShows();
    const shows = this.selectShows(allShows);

    await this.searchAndSaveSingeShow(shows, 'DOCUMENTARY');
    return 'Fetched and saved.';
  }

  async fetchNewMovies(): Promise<string> {
    const allMovies = await this.rtvService.getAllMovies();
    const shows = this.selectMovies(allMovies);

    await this.searchAndSaveSingeShow(shows, 'MOVIE');
    return 'Fetched and saved.';
  }

  private selectShows(data: any): any[] {
    const shows = [];

    data.recordings.forEach(recording => {
      // search for foreign documentaries
      if (recording.geoblocked === '1' && (
        recording.stub === 'tuji-dokumentarni-filmi-in-oddaje' ||
        recording.stub === 'dokumentarni-filmi-in-oddaje-izobrazevalni-program'
      )) {
        shows.push({
          title: recording.title,
          id: recording.id
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

  async searchAndSaveSingeShow(shows: any[], showType: 'MOVIE' | 'DOCUMENTARY') {

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

            if (episode.filename[0] !== '/') {
              episode.filename = '/' + episode.filename;
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
            this.create(mediaData);
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
