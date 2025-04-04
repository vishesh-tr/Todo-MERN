// src/Types/types.ts
import { Request } from "express";
import { IUser } from "../model/user.model";

export interface AuthenticatedRequest extends Request {
  user: IUser;
}
