import express, { Router } from "express";
import { requestReset } from "../controllers/passwordReset.controller";

const router: Router = express.Router();

router.post('/reset-password-request', requestReset);

export default router;