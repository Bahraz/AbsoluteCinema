import type { Request, Response, NextFunction } from "express";
import { Hall } from "@models/hallModel";

export class HallController {
  async showHall(req: Request, res: Response) {
    try {
      const halls = await Hall.find({}, "name");
      res.json(halls);
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Nieznany błąd";
      res.status(500).json({ error });
    }
  }
}

export const hallController = new HallController();