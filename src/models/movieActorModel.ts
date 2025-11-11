import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IMovieActor extends Document {
  _id: string;
  movie_id: Types.ObjectId;
  actor_id: Types.ObjectId;
}

const MovieActorSchema = new Schema<IMovieActor>({
  
  movie_id: { type: Schema.Types.ObjectId, ref: 'Movie', required: true },
  actor_id: { type: Schema.Types.ObjectId, ref: 'Actor', required: true },
});

export const MovieActor = mongoose.model<IMovieActor>('MovieActor',MovieActorSchema,'movies_actors');

