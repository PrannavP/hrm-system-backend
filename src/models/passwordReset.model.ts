import { pool } from "../config/db";

export const createNewResetRequest = async (full_name: string, department: string, role: string, message: string) => {
    const result = await pool.query(
        `INSERT INTO passwords_reset_requests (full_name, department, role, message) VALUES ($1, $2, $3, $4) RETURNING *`,
        [full_name, department, role, message]
    );

    return result.rows[0];
};