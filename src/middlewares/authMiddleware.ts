import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  // Add token validation logic
  next();
};

export default authMiddleware;
