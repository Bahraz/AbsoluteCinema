import type { Request, Response, NextFunction } from "express";
import { Movie } from "@models/movieModel";
import { MovieActor } from "@models/movieActorModel";
import { Actor } from "@models/actorModel";
import { MovieGenre } from "@models/movieGenreModel";
import { Genre } from "@models/genreModel";

export class MovieController {
  async showMovies(req: Request, res: Response) {
    try {
      const movies = await Movie.find({}, "title");
      res.json(movies);
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Nieznany błąd";
      res.status(500).json({ error });
    }
  }

  async showMovieDetails(req: Request, res: Response) {
    try {
      const movie = await Movie.findOne({ title: req.params.title }).lean();
      if (!movie)
        return res.status(404).json({ message: "Nie znaleziono filmu" });

      const movieActors = await MovieActor.find({ movie_id: movie._id }).lean();
      const movieGenres = await MovieGenre.find({ movie_id: movie._id }).lean();

      res.json({
        title: movie.title,
        duration: movie.duration,
        release_year: movie.release_year,
        actors: await Promise.all(
          movieActors.map(async (ma) => {
            const actor = await Actor.findById(ma.actor_id).lean();
            return actor ? { name: actor.name, surname: actor.surname } : null;
          })),
        genre: await Promise.all(
          movieGenres.map(async (mg) => {
            const genre = await Genre.findById(mg.genre_id).lean();
            return genre ? { name: genre.name } : null;
          })),
      });
    } catch (err) {
      console.error(err);
      const error = err instanceof Error ? err.message : "Nieznany błąd";
      res.status(500).json({ error });
    }
  }

  async addMovie(req: Request, res: Response) {
    const movie = new Movie({
      title: req.body.title,
      duration: req.body.duration,
      release_year: req.body.release_year,
    });

    try {
      await movie.save();
      res.status(201).json(movie);
    } catch (e: unknown) {
      const errors = e instanceof Error ? e.message : "Nieznany błąd";
      res.status(422).json({ errors });
    }
  }

  async delete(req: Request, res: Response) {
    const { title } = req.params;
    try {
      await Movie.deleteOne({ title });
      res.sendStatus(204);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : "Nieznany błąd" });
    }
  }

  async edit(req: Request, res: Response) {
    const editName = req.body.name;

    const actor = await Actor.findById("_id");
    if (!actor)
      return res.status(404).json({ message: "Nie znaleziono aktora" });

    actor.name = editName;

    try {
      await actor.save();
      res.redirect("/");
    } catch (e: unknown) {
      const errors = e instanceof Error ? e.message : "Nieznany błąd";
      res.status(422).json({ errors });
    }
  }
}

export const movieController = new MovieController();