import type { Request } from "express";
import { UserData } from "../models/userModel";

export interface ValidatedRequest extends Request {
	userData: UserData;
}
