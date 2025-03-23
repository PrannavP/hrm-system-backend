import { Request, Response } from 'express';
import jwt from 'jsonwebtoken'; // Correct import for jsonwebtoken
import bcrypt from 'bcryptjs';
import { config } from '../config/db';
import { getEmployeeByEmail, createEmployee, comparePassword, getEmployeeProfileById } from '../models/employee.model';

// Define the types for the request bodies
interface LoginRequestBody {
  email: string;
  password: string;
}

interface RegisterRequestBody {
  emp_id: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  department: string;
  role: string;
  join_date: string; // Can also use Date if required
}

// Login function with JWT token generation
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body as LoginRequestBody;

    // Check if employee exists in the database
    const employee = await getEmployeeByEmail(email);
    if (!employee) {
        return res.status(404).json({ message: 'Employee not found' });
    }

    // Compare the provided password with the stored hash
    const isPasswordValid = await comparePassword(password, employee.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid password' });
    }

    // Create JWT payload
    const payload = {
        emp_id: employee.emp_id,
        email: employee.email,
        id: employee.id,
    };

    // Ensure the jwtSecret is defined and fallback to a default if undefined
    const jwtSecret: string = config.jwtSecret || 'your_default_jwt_secret_key';

    // Generate JWT token with an expiration time (from config)
    try {
        const token = jwt.sign(
            payload,
            Buffer.from(jwtSecret),
            {
                algorithm: 'HS256',
                expiresIn: "2h",
            }
        );

        // Send token in response
        res.json({
            message: 'Login successful',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error generating token' });
    }
};

// Register function to create a new employee and store in the database
export const register = async (req: Request<{}, {}, RegisterRequestBody>, res: Response) => {
    const { emp_id, first_name, last_name, email, password, department, role, join_date } = req.body;

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new employee record in the database
    const newEmployee = await createEmployee(emp_id, first_name, last_name, email, hashedPassword, department, role, join_date);

    // Send response confirming successful registration
    res.status(201).json({ message: 'Employee registered successfully', _id: newEmployee.id });
};

// Get employees profile by id
export const getEmployeeProfile = async(req: Request, res:Response) => {
    try{
        const { emp_table_id } = req.body;

        console.log(emp_table_id);

        const employeeProfileData = await getEmployeeProfileById(emp_table_id);

        res.status(200).json(employeeProfileData);
    }catch(error){
        console.log("Error while getting emplogyee from emp_table_id", error);
        res.status(500).json({ message: "Error getting employee profile", error });
    }
}