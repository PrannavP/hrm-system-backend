import express, { Router } from 'express';
import {
    createTaskController,
    getAllTasksForHrController,
    getTasksByAssignedToController,
    updateTaskFieldController,
    getTaskByIdController,
    getTaskByAssignedToAndTaskIdController,
} from '../controllers/tasks.controller';

const router: Router = express.Router();

router.post('/hr/create-task', createTaskController);
router.get('/hr/get-all-tasks', getAllTasksForHrController);
router.get('/tasks/get-task/:task_id', getTaskByIdController);
router.get('/tasks/get-tasks/:assigned_to', getTasksByAssignedToController);
router.post('/tasks/update-task-field', updateTaskFieldController);

router.get('/tasks/get-tasks/:assigned_to/:task_id', getTaskByAssignedToAndTaskIdController);

export default router;
