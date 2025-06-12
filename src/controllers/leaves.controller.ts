import { Request, Response } from "express";
import { createNewLeaves, fetchLeavesByEmpId, fetchAllEmployeeLeaves, changeLeavesStatus, changeApprovedBy } from "../models/leaves.model";

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
        const { emp_id } = req.params;
        console.log(emp_id);

        const fetchEmployeeLeaves = await fetchLeavesByEmpId(emp_id);

        res.status(200).json({ fetchEmployeeLeaves });
    }catch(error){
        console.log(error);
        res.status(500).json({ message: "Internal server error", error: (error as Error).message });
    }
};

export const fetchAllEmployeesLeavesController = async(req: Request, res: Response) => {
    try{
        const allEmployeesLeaveRequests = await fetchAllEmployeeLeaves();
        res.status(200).json({ allEmployeesLeaveRequests });
    }catch(err){
        console.log(err);
        res.status(500).json({ message: "Internal server error", error: (err as Error).message });
    }
};

export const changeEmployeesLeavesStatusController = async (req: Request, res: Response) => {
    try{
        const { leave_id, status } = req.body;
        console.log(leave_id, status);

        const changedLeaveStatus = await changeLeavesStatus(Number(leave_id), status);
        res.status(201).json({ message: 'Leave status updated', changedLeaveStatus });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error', err });
    }
};

export const changeApprovedByLeavesController = async (req: Request, res: Response) => {
    try{
        const { hr_email, leave_id } = req.body;
        console.log(hr_email, leave_id);

        await changeApprovedBy(hr_email, leave_id);
        res.status(201).json({ message: 'Leave details updated' });
    }catch(err){
        console.error(err);
        res.status(500).json({ message: 'Internal server error', err });
    }
};