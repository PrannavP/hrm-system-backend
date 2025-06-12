import express, { Router } from "express";
import { registerHr, hrLogin, getAllEmployeesList, getEmployeeByEidController } from "../controllers/hrController";

const router: Router = express.Router();

router.post("/create-hr-account", registerHr);

router.post("/login-hr",hrLogin as express.RequestHandler);

router.get("/hr/employees-list", getAllEmployeesList);

router.get("/hr/employee/:emp_id", getEmployeeByEidController as express.RequestHandler);

export default router;