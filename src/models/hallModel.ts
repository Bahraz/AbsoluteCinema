import mongoose, { Schema, Document } from 'mongoose';


export interface IHall extends Document {
  name: string;
}

const HallSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true }
});

export const Hall = mongoose.model<IHall>('Hall', HallSchema);
