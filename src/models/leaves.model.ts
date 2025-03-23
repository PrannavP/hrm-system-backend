import { pool } from "../config/db";

interface Leave {
    leave_type: 'Sick' | 'Annual' | 'Casual';
    starting_date: string; // Use string for date to simplify input
    ending_date?: string; // Optional
    emp_id: string;
    reason: string;
}

export const createNewLeaves = async (leave: Leave): Promise<Leave> => {
    const { leave_type, starting_date, ending_date, emp_id, reason } = leave;
    const result = await pool.query(
        `INSERT INTO leaves (leave_type, starting_date, ending_date, emp_id, reason)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [leave_type, starting_date, ending_date, emp_id, reason]
    );
    return result.rows[0];
}

export const fetchLeaves = async(e_id: number) => {
    const result = await pool.query(
        `SELECT * FROM leaves WHERE emp_id = $1`,
        [e_id]
    );
    return result.rows;
};