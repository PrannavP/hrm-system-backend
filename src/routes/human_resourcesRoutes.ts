import express, { Router } from "express";
import { registerHr, hrLogin, getAllEmployeesList } from "../controllers/hrController";

const router: Router = express.Router();

router.post("/create-hr-account", registerHr);

router.post("/login-hr",hrLogin as express.RequestHandler);

router.get("/hr/employees-list", getAllEmployeesList);

export default router;