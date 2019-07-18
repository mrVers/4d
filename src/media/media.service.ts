import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Media, MediaDto } from './schema/media.model';

@Injectable()
export class MediaService {

  constructor(@Inject('MEDIA_MODEL') private readonly mediaModel: Model<Media>) {
  }

  async create(createMedia: MediaDto): Promise<Media> {

    const episodes = await this.mediaModel.find({ recordingId: createMedia.recordingId });

    if (!episodes.length) {
      const createdMedia = new this.mediaModel(createMedia);
      return await createdMedia.save();
    }
  }

  async findAll(): Promise<Media[]> {
    return await this.mediaModel.find();
  }

  async findOne(id: any): Promise<Media[]> {
    id = Number(id);
    return await this.mediaModel.find({ 'response.id': id });
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

  async getDocs2(): Promise<Media[]> {
    return await this.mediaModel.find({type: 'DOCUMENTARY'}).sort({ createdAt: -1 }).limit(20);
  }

  async getMovies(): Promise<Media[]> {
    return await this.mediaModel.find({type: 'MOVIE'}).sort({ createdAt: -1 });
  }
}
