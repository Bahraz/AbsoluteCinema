import type { Request, Response, NextFunction } from "express";
import { Genre } from "@models/genreModel";

export class GenreController {
  async showGenres(req: Request, res: Response) {
    try {
      const genres = await Genre.find({}, "name");
      res.json(genres);
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Nieznany błąd";
      res.status(500).json({ error });
    }
  }
}

export const genreController = new GenreController();