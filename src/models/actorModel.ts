import mongoose, { Schema, Document } from 'mongoose';

export interface IActor extends Document {
  name: string;
  surname: string;
}

const ActorSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  surname: { type: String, required: true, trim: true }
});

export const Actor = mongoose.model<IActor>('Actor', ActorSchema);

