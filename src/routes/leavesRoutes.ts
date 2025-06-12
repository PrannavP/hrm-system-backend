import express, { Router } from "express";
import { askLeave, changeEmployeesLeavesStatusController, fetchAllEmployeesLeavesController, fetchLeavesByEmployeeId, changeApprovedByLeavesController } from "../controllers/leaves.controller";

const router: Router = express.Router();

router.post("/ask-leave", askLeave);
router.get("/get-leaves/:emp_id", fetchLeavesByEmployeeId);
router.get("/hr/get-all-employees-leaves", fetchAllEmployeesLeavesController);
router.post("/hr/change-leave-status", changeEmployeesLeavesStatusController);
router.post("/hr/change-leave-detail", changeApprovedByLeavesController)

export default router;