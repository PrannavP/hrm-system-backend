import express, { Router } from 'express';
import {
    createTaskController,
    getAllTasksForHrController,
    getTasksByAssignedToController,
    updateTaskFieldController,
} from '../controllers/tasks.controller';

const router: Router = express.Router();

router.post('/hr/create-task', createTaskController);
router.get('/hr/get-all-tasks', getAllTasksForHrController);
router.get('/tasks/get-tasks/:assigned_to', getTasksByAssignedToController);
router.post('/tasks/update-task-field', updateTaskFieldController);

export default router;
