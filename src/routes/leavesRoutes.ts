import express, { Router } from "express";
import { askLeave, fetchLeavesByEmployeeId } from "../controllers/leaves.controller";

const router: Router = express.Router();

router.post("/ask-leave", askLeave);
router.post("/get-leaves", fetchLeavesByEmployeeId);

export default router;