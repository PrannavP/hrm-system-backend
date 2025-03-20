import { Request, Response } from "express";
import { isInsideOffice } from "../utils/geofence";

export const checkIn = (req: Request, res: Response): void => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        res.status(400).json({ message: "Latitude and Longitude are required." });
        return;
    }

    if (isInsideOffice(latitude, longitude)) {
        console.log("success check in")
        res.status(200).json({ message: "Check-in successful!" });
    } else {
        res.status(403).json({ message: "Check-in failed. You are not in the office location." });
    }
};

export const checkOut = (req: Request, res: Response): void => {
    const { latitude, longitude } = req.body;

    if (!latitude || !longitude) {
        res.status(400).json({ message: "Latitude and Longitude are required." });
        return;
    }

    if (isInsideOffice(latitude, longitude)) {
        console.log("success check out")
        res.status(200).json({ message: "Check-out successful!" });
    } else {
        res.status(403).json({ message: "Check-out failed. You are not in the office location." });
    }
};