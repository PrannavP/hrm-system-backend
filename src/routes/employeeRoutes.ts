import express, { Router } from 'express';
import { login, register, getEmployeeProfile, getLeavesOfEmployee, getAttendanceDataOfEmployee } from '../controllers/employee.controller';

const router: Router = express.Router();

router.post('/login-employee', login as express.RequestHandler);
router.post('/create-employee', register as express.RequestHandler);
router.post('/get-employee', getEmployeeProfile);
router.post('/get-employee-leaves', getLeavesOfEmployee);
router.post('/get-employee-attendance', getAttendanceDataOfEmployee);

export default router;