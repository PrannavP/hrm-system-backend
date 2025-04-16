import express from "express";
import { saveCheckInTime, getCheckInTime } from "../controllers/timer.controller";

const router = express.Router();

router.post('/sync-timer', saveCheckInTime);
router.post('/get-synced-timer', getCheckInTime);

export default router;