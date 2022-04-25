import { Request, Response } from "express";

export class UserController {
  GetUser(req: Request, res: Response) {
    res.status(200).json({
      user: "Mirko Wlk",
    });
  }
}
