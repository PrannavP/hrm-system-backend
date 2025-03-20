import { Request, Response } from "express";
import { AttendanceModel } from "../models/attendance.model";

export const checkIn = async (req: Request, res: Response) => {
    try {
        const { emp_id } = req.body;
        const attendance = await AttendanceModel.checkIn(emp_id);
        res.status(200).json({ message: "Checked in successfully", attendance });
    } catch (error) {
        res.status(500).json({ error: "Error checking in" });
    }
};

export const checkOut = async (req: Request, res: Response) => {
    try {
        const { emp_id } = req.body;
        const attendance = await AttendanceModel.checkOut(emp_id);
        res.status(200).json({ message: "Checked out successfully", attendance });
    } catch (error) {
        res.status(500).json({ error: "Error checking out" });
    }
};

export const getAttendance = async (req: Request, res: Response) => {
    try {
        const { emp_id } = req.params;
        const attendance = await AttendanceModel.getAttendance(emp_id);
        res.status(200).json(attendance);
    } catch (error) {
        res.status(500).json({ error: "Error fetching attendance" });
    }
};