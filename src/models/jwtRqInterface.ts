import { UserData } from "../models/userModel";
import type { Request } from "express";

export interface ValidationRequest extends Request {
	userData: UserData;
}
