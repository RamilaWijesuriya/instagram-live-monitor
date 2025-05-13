import { Schema, model, Document } from 'mongoose';

export interface IAccount extends Document {
  username: string;
  session: Record<string, any>;
  lastLogin: Date;
}

const AccountSchema = new Schema<IAccount>({
  username: { type: String, required: true, unique: true },
  session: { type: Object, required: true },
  lastLogin: { type: Date, default: Date.now },
});

export default model<IAccount>('Account', AccountSchema);
