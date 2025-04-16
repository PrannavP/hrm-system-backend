import { Request, Response } from "express";
import { saveTimer, getTimer } from "../models/timer.model";

export const saveCheckInTime = async(req: Request, res: Response) => {
    try{
        const { emp_id } = req.body;    
        const saveTimerData = await saveTimer(emp_id);
        res.status(200).json({ message: "Saved Timer Successfully", saveTimerData });
    }catch(err){
        console.log('Error while syncing timer', err);
        res.status(500).json({ error: "Error: " + err });
    }
};

export const getCheckInTime = async(req: Request, res:Response) => {
    try{
        const { emp_id } = req.body;
        const getTimerData = await getTimer(emp_id);
        res.status(200).json({ message: "Check-in time retrieved.", getTimerData });
    }catch(err){
        console.log('Error while getting synced time', err);
        res.status(500).json({ error: "Error", err });
    }
};