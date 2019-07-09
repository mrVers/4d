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
}
