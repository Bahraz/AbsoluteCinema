import mongoose, { Schema, Document } from 'mongoose';

export interface IMovieGenre extends Document {
  movie_id: mongoose.Types.ObjectId;
  genre_id: mongoose.Types.ObjectId;
}

const MovieGenreSchema: Schema = new Schema({
  movie_id: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  genre_id: { type: Schema.Types.ObjectId, ref: 'Genre', required: true }
});

MovieGenreSchema.index({ movie_id: 1, genre_id: 1 }, { unique: true });

export const MovieGenre = mongoose.model<IMovieGenre>('MovieGenre', MovieGenreSchema,'movies_genres');
