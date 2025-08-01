import { Request, Response } from 'express';
import { isInsideOffice } from '../utils/geofence';
import { AttendanceModel } from '../models/attendance.model';
import { changeActiveCheckinStatus, saveTimer } from '../models/timer.model';

export const checkIn = async (req: Request, res: Response) => {
    const { latitude, longitude, emp_id, uid } = req.body;

    if (!latitude || !longitude) {
        res.status(400).json({ message: 'Latitude and Longitude are required.' });
        return;
    }

    if (isInsideOffice(latitude, longitude)) {
        try {
            // Save the checkin and checkout time in the attendace table.
            const attendance = await AttendanceModel.checkIn(emp_id);

            // Save the checkin and checkout time in active_checkins table.
            await saveTimer(uid);

            res.status(200).json({ message: 'Checked in successfully', attendance });
        } catch (error) {
            res.status(500).json({ error: 'Error storing checkin in database.' });
        }
    } else {
        res.status(403).json({ message: 'Check-in failed. You are not in the office location.' });
    }
};

export const checkOut = async (req: Request, res: Response) => {
    // const { latitude, longitude, emp_id } = req.body;

    // if (!latitude || !longitude) {
    //     res.status(400).json({ message: "Latitude and Longitude are required." });
    //     return;
    // }

    // if (isInsideOffice(latitude, longitude)) {
    //     console.log("success check out")

    //     // testing stuffs
    //     try{
    //         const attendance = await AttendanceModel.checkOut(emp_id);
    //         res.status(200).json({ message: "Checked out successfully", attendance });
    //     }catch(err){
    //         res.status(500).json({ error: "Error storing checkin in database." });
    //     }
    // } else {
    //     res.status(403).json({ message: "Check-out failed. You are not in the office location." });
    // }

    const { emp_id, uid } = req.body;

    try {
        const attendance = await AttendanceModel.checkOut(emp_id);

        // update the status to false in active_checins table for the employee
        await changeActiveCheckinStatus(uid);

        res.status(200).json({ message: 'Checked out successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Checkout failed. Please try again' });
    }
};
