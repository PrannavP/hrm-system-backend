import { Request, Response } from "express";
import { createNewLeaves, fetchLeaves } from "../models/leaves.model";

export const askLeave = async (req: Request, res: Response): Promise<void> => {
    try {
        const { leave_type, starting_date, ending_date, emp_id, reason} = req.body;

        // Validate required fields
        if (!leave_type || !starting_date || !emp_id || !reason) {
            res.status(400).json({ message: "leave_type, starting_date, emp_id and reason are required." });
        }

        // Create new leave
        const newLeave = await createNewLeaves({
            leave_type,
            starting_date,
            ending_date,
            emp_id,
            reason
        });

        res.status(201).json(newLeave);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
};

export const fetchLeavesByEmployeeId = async(req: Request, res: Response): Promise<void> => {
    try{
        const { emp_table_id } = req.body;

        const fetchEmployeeLeaves = await fetchLeaves(emp_table_id);

        res.status(200).json({ fetchEmployeeLeaves });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: (error as Error).message });
    }
};