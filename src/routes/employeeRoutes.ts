import express, { Router } from 'express';
import { login, register } from '../controllers/employee.controller';

const router: Router = express.Router();

router.post('/login-employee', login as express.RequestHandler);
router.post('/create-employee', register as express.RequestHandler);

export default router;