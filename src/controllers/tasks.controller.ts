import e, { Request, Response } from 'express';
import {
    createTaskHr,
    getTasksByAssignedTo,
    updateTaskById,
    getAllTasksForHr,
    getTaskByIdForHr,
} from '../models/tasks';

// Create a new task
export const createTaskController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            title,
            description,
            assigned_to,
            assigned_by,
            priority,
            status,
            start_date,
            due_date,
            completed_at,
            remarks,
        } = req.body;

        if (
            !title ||
            !description ||
            !assigned_to ||
            !assigned_by ||
            !priority ||
            !status ||
            !start_date ||
            !due_date
        ) {
            res.status(400).json({ message: 'Missing required fields.' });
            return;
        }

        const newTask = await createTaskHr(
            title,
            description,
            assigned_to,
            assigned_by,
            priority,
            status,
            start_date,
            due_date,
            completed_at || null,
            remarks || ''
        );

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
};

// Get all tasks for HR
export const getAllTasksForHrController = async (req: Request, res: Response): Promise<void> => {
    try {
        const tasks = await getAllTasksForHr();
        res.status(200).json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
};

// Get tasks by assigned_to (employee)
export const getTasksByAssignedToController = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const { assigned_to } = req.params;
        if (!assigned_to) {
            res.status(400).json({ message: 'assigned_to parameter is required.' });
            return;
        }
        const tasks = await getTasksByAssignedTo(Number(assigned_to));
        res.status(200).json({ tasks });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
};

// Get task by task id
export const getTaskByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { task_id } = req.params;
        console.log('taskcontroller: ', task_id);
        if (!task_id) {
            res.status(400).json({ message: 'Task Id parameter is required.' });
            return;
        }

        const task = await getTaskByIdForHr(Number(task_id));
        res.status(200).json({ task });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: (error as Error).message });
    }
};

// Update a specific field of a task (e.g., status)
export const updateTaskFieldController = async (req: Request, res: Response): Promise<void> => {
    try {
        const { taskId, field, value } = req.body;
        if (!taskId || !field || typeof value === 'undefined') {
            res.status(400).json({ message: 'taskId, field, and value are required.' });
            return;
        }
        const updatedTask = await updateTaskById(Number(taskId), { [field]: value });
        res.status(200).json({ message: 'Task updated', updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: (error as Error).message });
    }
};
