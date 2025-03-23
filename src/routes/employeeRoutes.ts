import express, { Router } from 'express';
import { login, register, getEmployeeProfile } from '../controllers/employee.controller';

const router: Router = express.Router();

router.post('/login-employee', login as express.RequestHandler);
router.post('/create-employee', register as express.RequestHandler);
router.post('/get-employee', getEmployeeProfile);

export default router;