import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { FrontMedia, Media, MediaDto } from './schema/media.model';

@Injectable()
export class MediaService {

  constructor(@Inject('MEDIA_MODEL') private readonly mediaModel: Model<Media>) {
  }

  async create(createMedia: MediaDto): Promise<Media> {

    const episode = await this.mediaModel.findOne({ recordingId: createMedia.recordingId });

    if (!episode) {
      const createdMedia = new this.mediaModel(createMedia);
      return await createdMedia.save();
    }
  }

  async getAll(): Promise<FrontMedia> {
    return {
      shows: await this.mediaModel.find({type: 'DOCUMENTARY'}).sort({ createdAt: -1 }).limit(20),
      movies: await this.mediaModel.find({type: 'MOVIE'}).sort({ createdAt: -1 }).limit(20),
    };
  }

  async findOne(id: any): Promise<Media> {
    id = Number(id);
    return await this.mediaModel.findOne({ 'response.id': id });
  }

  async updateAll() {
    return await this.mediaModel.find({type: undefined})
      .then((docs) => {
        if (docs === undefined || docs.length === 0) {
          return [];
        } else {
          docs.forEach((doc) => {
            this.mediaModel.findOneAndUpdate({_id: doc._id},
              { $set: {
                type: 'DOCUMENTARY',
                  createdAt: new Date(doc.response.broadcastDate)
              }})
              .exec();
          });
          console.log('updated');
        }
      });
  }

  async getDocs(): Promise<Media[]> {
    return await this.mediaModel.find({type: 'DOCUMENTARY'}).sort({ createdAt: -1 });
  }

  async getMovies(): Promise<Media[]> {
    return await this.mediaModel.find({type: 'MOVIE'}).sort({ createdAt: -1 });
  }
}
