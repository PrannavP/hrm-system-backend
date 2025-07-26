import express, { Router } from "express";
import { SaveEmployeePerformanceController } from "../controllers/employeePerformanceController";

const router: Router = express.Router();

router.post('/hr/save-employee-performance', SaveEmployeePerformanceController);

export default router;