import mongoose, { Schema, Document } from 'mongoose';


export interface IGenre extends Document {
  name: string;
}

const GenreSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true }
});

export const Genre = mongoose.model<IGenre>('Genre', GenreSchema);
