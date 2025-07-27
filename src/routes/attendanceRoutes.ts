import express from "express";
import { checkIn, checkOut, getAttendance, getAllEmployeeAttendance } from "../controllers/attendance.controller";

const router = express.Router();

router.post("/checkin", checkIn);
router.post("/checkout", checkOut);
router.get("/attendance/:emp_id", getAttendance);
router.get("/hr/EmployeesAttendance", getAllEmployeeAttendance);

export default router;