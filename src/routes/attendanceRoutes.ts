import express from "express";
import { checkIn, checkOut, getAttendance } from "../controllers/attendance.controller";

const router = express.Router();

router.post("/checkin", checkIn);
router.post("/checkout", checkOut);
router.get("/:emp_id", getAttendance);

export default router;