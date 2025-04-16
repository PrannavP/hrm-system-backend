import { pool } from "../config/db";

// get hr by email
export const getHrByEmail = async (hr_email: string) => {
    const result = await pool.query('SELECT * FROM human_resources WHERE email = $1', [hr_email]);
    return result.rows[0];
};

export const createHumanResource = async(hr_first_name: string, hr_last_name: string, hr_email: string, hr_password: string) => {
    const result = await pool.query(
        `INSERT INTO human_resources
        (first_name, last_name, email, password)
        VALUES
        ($1, $2, $3, $4) RETURNING hr_id
        `,
        [hr_first_name, hr_last_name, hr_email, hr_password]
    );
    return result.rows[0];
};

// compare passwords function
export const comparePassword = async (inputPassword: string, storedPassword: string) => {
    const bcrypt = require("bcryptjs");
    return bcrypt.compare(inputPassword, storedPassword);
};

// Get all employees list
export const getAllEmployees = async () => {
    const result = await pool.query(
        'SELECT emp_id, first_name, last_name, email, department, role, join_date FROM employees'
    );
    return result.rows;
};