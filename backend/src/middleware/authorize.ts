import jwt from "jsonwebtoken";
import { Response, NextFunction } from "express";
import User, { IUser } from "../model/user.model"; 
import { AuthenticatedRequest } from "../Types/types";

export const authenticate = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { userId: string };

    const user: IUser | null = await User.findById(decoded.userId);

    if (!user) {
      res.status(401).json({ message: "Unauthorized: User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (error) {
    let errorMessage = "Unauthorized: Invalid token";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    res.status(401).json({ message: errorMessage });
  }
};
