import { pool } from '../config/db';

// Model to get all tasks by hr
export const getAllTasksForHr = async () => {
    const query = `
        SELECT 
            t.*,
            (e.first_name || ' ' || e.last_name) AS assigned_to_name,
            (hr.first_name || ' ' || hr.last_name) AS assigned_by_name
        FROM tasks t
        LEFT JOIN employees e ON t.assigned_to = e.id
        LEFT JOIN human_resources hr ON t.assigned_by = hr.hr_id
    `;
    const result = await pool.query(query);
    return result.rows;
};

// Model to get task by id
export const getTaskByIdForHr = async (task_id: number) => {
    const query = `SELECT * FROM tasks WHERE id = $1`;

    const values = [task_id];
    const result = await pool.query(query, values);
    return result.rows;
};

// Model to create task by hr
export const createTaskHr = async (
    title: string,
    description: string,
    assigned_to: number,
    assigned_by: number,
    priority: string,
    status: string,
    start_date: string,
    due_date: string,
    completed_at: string | null,
    remarks: string
) => {
    const query = `
        INSERT INTO tasks (
            title,
            description,
            assigned_to,
            assigned_by,
            priority,
            status,
            start_date,
            due_date,
            completed_at,
            remarks
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING *;
    `;
    const values = [
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
    ];
    const result = await pool.query(query, values);
    return result.rows[0];
};

// Model to get task by assigned_to (employee) and task id
export const getTaskByAssignedToAndTaskId = async (assigned_to: number, task_id: number) => {
    const query = `
        SELECT * FROM tasks WHERE id = $1 AND assigned_to = $2;
    `;
    const values = [assigned_to, task_id];
    const result = await pool.query(query, values);
    return result.rows;
};

// Model to get task by assigned_to (employee)
export const getTasksByAssignedTo = async (assigned_to: number) => {
    const query = `
        SELECT *
        FROM tasks
        WHERE assigned_to = $1
        ORDER BY start_date DESC;
    `;
    const values = [assigned_to];
    const result = await pool.query(query, values);
    return result.rows;
};

// Model to update task by id
export const updateTaskById = async (
    taskId: number,
    fields: {
        title?: string;
        description?: string;
        assigned_to?: number;
        assigned_by?: number;
        priority?: string;
        status?: string;
        start_date?: string;
        due_date?: string;
        completed_at?: string | null;
        remarks?: string;
    }
) => {
    const setClauses = [];
    const values = [];
    let idx = 1;

    // If status is being updated and set to 'Completed', set completed_at to NOW()
    let useNowForCompletedAt = false;
    if (fields.status && fields.status.toLowerCase() === 'completed') {
        useNowForCompletedAt = true;
        fields.completed_at = undefined; // We'll handle this below
    }

    for (const [key, value] of Object.entries(fields)) {
        if (key === 'completed_at' && useNowForCompletedAt) {
            setClauses.push(`completed_at = NOW()`);
        } else if (typeof value !== 'undefined') {
            setClauses.push(`${key} = $${idx}`);
            values.push(value);
            idx++;
        }
    }

    if (setClauses.length === 0) {
        throw new Error('No fields to update');
    }

    values.push(taskId);

    const query = `
        UPDATE tasks
        SET ${setClauses.join(', ')}
        WHERE id = $${idx}
        RETURNING *;
    `;
    const result = await pool.query(query, values);
    return result.rows[0];
};
