import { Request, Response } from "express";
import { createNewResetRequest } from "../models/passwordReset.model";

// define the types for the password reset requests
interface PasswordRequestBody{
    full_name: string;
    department: string;
    role: string;
    message: string;
}

// request function
export const requestReset = async(req: Request, res: Response) => {
    const { full_name, department, role, message } = req.body as PasswordRequestBody;

    const newPasswordResetRequest = await createNewResetRequest(full_name, department, role, message);

    res.status(201).json({ message: "Password Reset Requested Successfully" });
};