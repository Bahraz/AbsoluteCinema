import type { Request, Response, NextFunction } from "express";

import { Actor } from "@models/actorModel";

export class ActorController {
  async showActors(req: Request, res: Response) {
    try {
      const actors = await Actor.find({}, "name surname");
      res.json(actors);
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Nieznany błąd";
      res.status(500).json({ error });
    }
  }

  async addActor(req: Request, res: Response) {
    const actor = new Actor({
      name: req.body.name,
      surname: req.body.surname
    });

    try {
      await actor.save();
      res.status(201).json(actor);
    } catch (e: unknown) {
      const errors = e instanceof Error ? e.message : "Nieznany błąd";
      res.status(422).json({ errors });
    }
  }

  async delete(req: Request, res: Response) {
    const { name } = req.params;
    try {
      await Actor.deleteOne({ name });
      res.sendStatus(204);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : "Nieznany błąd" });
    }
  }

  async edit(req: Request, res: Response) {
    const editName = req.body.name;

    const actorId = req.params.id;

    const actor = await Actor.findById(actorId);
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

export const actorController = new ActorController();
