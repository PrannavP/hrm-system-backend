import express, { Router } from "express";
import { SaveEmployeeAttritionController } from "../controllers/employeeAttritionController";

const router: Router = express.Router();

router.post('/hr/save-employee-attrition', SaveEmployeeAttritionController);

export default router;