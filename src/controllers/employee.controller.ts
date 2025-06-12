import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config/db';
import { deleteEmployeeByEmpId, getEmployeeByEmail, createEmployee, comparePassword, getEmployeeProfileById, getEmployeeTotalLeaves, getEmployeeTotalPresent } from '../models/employee.model';

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

// delete employee function
export const deleteEmployeeController = async (req: Request, res: Response) => {
    try {
        const { emp_id } = req.params;

        // Call the model function to delete the employee
        const employee = await deleteEmployeeByEmpId(emp_id);

        // Check if the employee was found and deleted
        if (!employee) {
            return res.status(404).json({ message: "Employee not found to delete" });
        }

        // Respond with success if the employee was deleted
        res.status(200).json({ message: "Employee deleted!" });
    } catch (err) {
        console.error("Error deleting employee:", err);
        res.status(500).json({ message: "Internal server error" });
    }
};

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
export const register = async (req: Request, res: Response) => {
    try {
      const { emp_id, first_name, last_name, email, password, department, role, phone_number, address } = req.body;
      const imagePath = req.file ? req.file.path : null;

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create employee with image path
      const newEmployee = await createEmployee(
        emp_id,
        first_name,
        last_name,
        email,
        hashedPassword,
        department,
        role,
        phone_number,
        address,
        imagePath
      );
  
      res.status(201).json({ 
        message: 'Employee registered successfully', 
        _id: newEmployee.id
      });
    } catch (error: any) {
      console.error(error);
      res.status(500).json({ 
        message: error.message || 'Error registering employee' 
      });
    }
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
};

// Get employees leaves data
export const getLeavesOfEmployee = async(req:Request, res:Response) => {
    try{
        const { emp_id, thisMonth } = req.body;

        if(thisMonth){
            const employeeOneMonthLeaveCounts = await getEmployeeTotalLeaves(emp_id, true);

            res.status(200).json(employeeOneMonthLeaveCounts);
        }else{
            const employeeLeavesData = await getEmployeeTotalLeaves(emp_id, false);

            res.status(200).json(employeeLeavesData);
        }
    }catch(error){
        console.log(`Error while getting employee leaves`, error);
        res.status(500).json({ message: "Error getting employee leaves data" });
    }
};

// Get employees attendance data
export const getAttendanceDataOfEmployee = async(req: Request, res:Response) => {
    try{
        const { emp_id, thisMonth } = req.body;

        if(thisMonth){
            const employeeOneMonthPresentCounts = await getEmployeeTotalPresent(emp_id, true);
            res.status(200).json(employeeOneMonthPresentCounts);
        }else{
            const employeeAttendanceData = await getEmployeeTotalPresent(emp_id, false);
            res.status(200).json(employeeAttendanceData);
        }
    }catch(error){
        console.log(`Error while getting employee attendance data`, error);
        res.status(500).json({ message: "Error getting employee attendance data" });
    }
};