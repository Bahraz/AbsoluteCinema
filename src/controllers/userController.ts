import type { Request, Response, NextFunction } from "express";

import { User } from "@models/userModel";

export class UserController {
  async showUsers(req: Request, res: Response) {
    try {
      const users = await User.find({}, "name surname email");
      res.json(users);
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : "Nieznany błąd";
      res.status(500).json({ error });
    }
  }

  async register(req: Request, res: Response) {
    const user = new User({
      name: req.body.name,
      surname: req.body.surname,
      password: req.body.password,
      email: req.body.email,
      created_at: new Date(),
    });

    try {
      await user.save();
      res.status(201).json(user);
    } catch (e: unknown) {
      const errors = e instanceof Error ? e.message : "Nieznany błąd";
      res.status(422).json({ errors });
    }
  }

  async login(req: Request, res: Response) {
    const emailUser = req.body.email;
    const passwordUser = req.body.password;

    try {
      const user = await User.findOne({ email: emailUser });
      if (!user) throw new Error("Nie ma takiego użytkownika");

      const isValidUser = user.comparePassword(passwordUser);
      if (!isValidUser) throw new Error("Złe hasło");

      res.status(200).json({ apiToken: user.apiToken });
    } catch (err: unknown) {
      res.sendStatus(401);
    }
  }

  logout(req: Request, res: Response) {
    req.session.destroy((err) => {
      if (err) console.error(err);
      res.redirect("/");
    });
  }

  async delete(req: Request, res: Response) {
    const { name } = req.params;
    try {
      await User.deleteOne({ name });
      res.sendStatus(204);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : "Nieznany błąd" });
    }
  }

  async edit(req: Request, res: Response) {
    const editPassword = req.body.password;
    const editEmail = req.body.email;

    const userId = req.session.user?._id;
    if (!userId) return res.status(401).json({ message: "Brak sesji" });

    const user = await User.findById(userId);
    if (!user)
      return res.status(404).json({ message: "Nie znaleziono użytkownika" });

    user.email = editEmail;
    if (editPassword) user.password = editPassword;

    try {
      await user.save();
      if (req.session.user) req.session.user.email = user.email;
      res.redirect("/");
    } catch (e: unknown) {
      const errors = e instanceof Error ? e.message : "Nieznany błąd";
      res.status(422).json({ errors });
    }
  }
}

export const userController = new UserController();
