import type { NextFunction, Request, Response } from "express";
const jwt_password = "your_jwt_secret_key"
import jwt from "jsonwebtoken"

// Extend Express Request interface to include userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const header = req.headers["authorization"];
  const decoded = jwt.verify(header as string, jwt_password) as { id: string } | undefined;
  if (decoded) {
    req.userId = decoded.id;
    next()
  } else {
    res.status(403).json({
      message: "u are not logged in"
    })
  }
}