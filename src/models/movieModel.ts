import mongoose, { Schema, Document } from 'mongoose';


export interface IMovie extends Document {
  title: string;
  duration: number;
  release_year: number;
}

const MovieSchema: Schema = new Schema({
  title: { type: String, required: true, trim: true },
  duration: { type: Number, required: true },
  release_year: { type: Number, required: true }
});

export const Movie = mongoose.model<IMovie>('Movie', MovieSchema);
