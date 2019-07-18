import * as mongoose from 'mongoose';
export let Mixed = mongoose.Schema.Types.Mixed;

export const MediaSchema = new mongoose.Schema({
  title: String,
  link: String,
  recordingId: Number,
  description: String,
  type: String,
  createdAt: { type: Date, default: Date.now },
  response: Mixed
});
