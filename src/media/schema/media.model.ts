import { Document } from 'mongoose';

export interface Media extends Document {
  readonly title: string;
  readonly link: string;
  readonly recordingId: number;
  readonly description: string;
  readonly type: string;
  readonly createdAt?: Date;
  readonly response: any;
}

export class MediaDto {
  readonly title: string;
  readonly link: string;
  readonly recordingId: number;
  readonly description: string;
  readonly type: string;
  readonly createdAt?: Date;
  // the full response
  readonly response: any;
}

export interface FrontMedia  {
  shows: Media[];
  movies: Media[];
}
