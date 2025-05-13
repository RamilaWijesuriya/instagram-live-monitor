import { Schema, model, Document } from 'mongoose';

export interface IStream extends Document {
  account: string;
  igStreamId: string;
  title?: string;
  startTime: Date;
  viewerCount: number;
  streamUrl: string;
  isActive: boolean;
}

const StreamSchema = new Schema<IStream>({
  account: { type: String, required: true },
  igStreamId: { type: String, required: true, unique: true },
  title: String,
  startTime: Date,
  viewerCount: Number,
  streamUrl: String,
  isActive: { type: Boolean, default: true },
});

export default model<IStream>('Stream', StreamSchema);
