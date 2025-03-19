import express from "express";
import { checkIn, checkOut } from "../controllers/checkinController";

const router = express.Router();

router.post("/checkin", checkIn);
router.post("/checkout", checkOut);

export default router;