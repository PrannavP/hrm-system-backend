import { pool } from '../config/db'; // Import the pool from config

export const getEmployeeByEmail = async (email: string) => {
    const result = await pool.query('SELECT * FROM employees WHERE email = $1', [email]);
    return result.rows[0];
};

export const createEmployee = async (emp_id: string, first_name: string, last_name: string, email: string, password: string, department: string, role: string, join_date: string) => {
    const result = await pool.query(
        'INSERT INTO employees (emp_id, first_name, last_name, email, password, department, role, join_date) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id',
        [emp_id, first_name, last_name, email, password, department, role, join_date]
    );
    return result.rows[0];
};

export const comparePassword = async (inputPassword: string, storedPassword: string) => {
    const bcrypt = require('bcryptjs');
    return bcrypt.compare(inputPassword, storedPassword);
};


export const getEmployeeProfileById = async(emp_table_id: number) => {
    console.log(emp_table_id);

    const result = await pool.query(
        `SELECT emp_id, first_name, last_name, email, department, role, join_date FROM employees WHERE id = $1`,
        [emp_table_id]
    );
    return result.rows[0];
};