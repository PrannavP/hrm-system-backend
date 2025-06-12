import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../config/db";

import { getEmployeeByEid, getAllEmployees, comparePassword, createHumanResource, getHrByEmail } from "../models/human_resource.model";

// HR login request bodies
interface LoginRequestBody{
    email: string;
    password: string;
}

// HR Register body
interface RegisterRequestBody{
    first_name: string;
    last_name: string;
    email: string;
    password: string;
}

// Get employee by emp_id
export const getEmployeeByEidController = async (req:Request, res: Response) => {
    try{
        const { emp_id } = req.params;
        
        const employee = await getEmployeeByEid(emp_id);

        if(!employee){
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.status(201).json({ employee });
    }catch(err){
        console.error("Error fetching employee by emp_id: ", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all employees controller function
export const getAllEmployeesList = async (req: Request, res: Response) => {
    try {
        const employees = await getAllEmployees();
        res.status(200).json({ employees });
    } catch (error) {
        console.error("Controller error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

// Register function
export const registerHr = async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
    const { first_name, last_name, email, password } = req.body;

    // hash the password field before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new hr record in the db
    const newHr = await createHumanResource(first_name, last_name, email, hashedPassword);

    // send response confirming successful registration
    res.status(201).json({ message: 'Human Resource account created!', _id: newHr.id });
};

// Login HR function
export const hrLogin = async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginRequestBody;

    // Check if HR exists in the database
    const human_resource = await getHrByEmail(email);
    if(!human_resource){
        return res.status(404).json({ message: "HR account not found" });
    }

    // compare the provided password with the stored hash password
    const isPasswordValid = await comparePassword(password, human_resource.password);
    if(!isPasswordValid){
        return res.status(401).json({ message: 'Invalid Password' });
    }

    // create jwt payload
    const payload = {
        hr_id: human_resource.hr_id,
        email: human_resource.email
    }

    const jwtSecret: string = config.jwtSecret || 'my_default_jwt_secret_key';

    // Generate the JWT token with an expiration time (from config)
    try{
        const token = jwt.sign(
            payload,
            Buffer.from(jwtSecret),
            {
                algorithm: 'HS256',
                expiresIn: '1h'
            }
        );

        // send token in response
        res.json({
            message: 'Login Successful',
            token
        });
    } catch(error){
        console.log(error);
        res.status(500).json({ message: 'Error generating token' });
    }
};