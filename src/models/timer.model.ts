import { pool } from "../config/db";

export const saveTimer = async(emp_id: number) => {
    console.log(emp_id);

    const result = await pool.query(
        `INSERT INTO active_checkins (emp_id) VALUES ($1) RETURNING *`,
        [emp_id]
    );

    return result.rows[0];
};

export const getTimer = async(emp_id: number) => {
    const result = await pool.query(
        `SELECT * FROM active_checkins WHERE emp_id = $1`, [emp_id]
    );

    return result.rows[0];
};