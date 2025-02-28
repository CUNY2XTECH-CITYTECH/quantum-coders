import { Request, Response, NextFunction } from "express";
import Session from "supertokens-node/recipe/session";

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await Session.getSession(req, res);
    next();
  } catch (err) {
    res.status(401).json({ error: "Unauthorized" });
  }
};
