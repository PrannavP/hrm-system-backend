import { pool } from '../config/db'; // Import the pool from config

export const getEmployeeByEmail = async (email: string) => {
    const result = await pool.query('SELECT * FROM employees WHERE email = $1', [email]);
    return result.rows[0];
};

export const createEmployee = async (
    emp_id: string,
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    department: string,
    role: string,
    phone_number: string,
    address: string,
    image: string | null // Add image parameter
  ) => {
    const result = await pool.query(
      'INSERT INTO employees (emp_id, first_name, last_name, email, password, department, role, phone_number, address, image) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING id',
      [emp_id, first_name, last_name, email, password, department, role, phone_number, address, image]
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
        `SELECT * FROM employees WHERE id = $1`,
        [emp_table_id]
    );
    return result.rows[0];
};

// get employees total leaves days of a month or all leaves data
export const getEmployeeTotalLeaves = async(emp_id: number, thisMonth: boolean) => {
    if(thisMonth){
        const result = await pool.query(
            `
                SELECT SUM(total_days) AS total_days
                FROM leaves
                WHERE emp_id = $1
                AND status = 'Approved'
                AND EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM CURRENT_DATE)
                AND EXTRACT(MONTH FROM created_at) = EXTRACT(MONTH FROM CURRENT_DATE);
            `,
            [emp_id]
        );

        return result.rows[0];
    }else{
        const result = await pool.query(
            `SELECT * FROM leaves WHERE emp_id = $1`, [emp_id]
        );

        return result.rows;
    }
};

// delete employee model
export const deleteEmployeeByEmpId = async (emp_id: string) => {
    const result = await pool.query(`DELETE FROM employees WHERE emp_id = $1 RETURNING *`, [emp_id]);
    return result.rows[0];
};

// get employee total present days of a month or all present data
export const getEmployeeTotalPresent = async(emp_id: string, thisMonth: boolean) => {
    if(thisMonth){
        const result = await pool.query(
            `
            SELECT COUNT(DISTINCT date) AS present_days
            FROM attendance
            WHERE emp_id = $1
            AND status = 'Present'
            AND date >= DATE_TRUNC('month', CURRENT_DATE)
            AND date < DATE_TRUNC('month', CURRENT_DATE) + INTERVAL '1 month';
            `, [emp_id]
        );

        return result.rows[0];
    }else{
        const result = await pool.query(
            `SELECT * FROM attendance WHERE emp_id = $1`, [emp_id]
        );

        return result.rows;
    }
};