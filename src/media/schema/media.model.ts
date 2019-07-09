import { Document } from 'mongoose';

export interface Media extends Document {
  readonly title: string;
  readonly link: string;
  readonly recordingId: number;
  readonly description: string;
  readonly response: any;
}

export class MediaDto {
  readonly title: string;
  readonly link: string;
  readonly recordingId: number;
  readonly description: string;
  // the full response
  readonly response: any;
}
