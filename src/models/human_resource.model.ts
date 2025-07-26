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
        'SELECT emp_id, first_name, last_name, email, department, role, image, join_date FROM employees'
    );
    return result.rows;
};

// Get employee by EID
export const getEmployeeByEid = async (emp_id: string) => {
    const result = await pool.query(
        `SELECT * FROM employees WHERE emp_id = $1`,
        [emp_id]
    );

    return result.rows[0];
};

// HR Dashboard recently joined employees (last 1 month) list
export const getRecentlyJoinedEmployees = async () => {
    const result = await pool.query(
        `
            SELECT emp_id, first_name, last_name, department
            FROM employees
            WHERE join_date >= CURRENT_DATE - INTERVAL '1 month';
        `
    );

    return result.rows;
};

// HR Dashboard active tasks list
export const getHRDashboardActiveTasks = async () => {
    const result = await pool.query(
        `
            SELECT title, priority, status, due_date
            FROM tasks
            WHERE status = 'Pending' OR status = 'In Progress'
            LIMIT 7
        `
    );

    return result.rows;
};

// HR Dashboard employees on leave on that day list
export const getHRDashboardEmployeesOnLeave = async () => {
    const result = await pool.query(
        `
            SELECT 
                e.first_name || ' ' || e.last_name AS employee_name,
                l.leave_type
            FROM 
                leaves l
            JOIN 
                employees e ON l.emp_id = e.emp_id
            WHERE 
                CURRENT_DATE BETWEEN l.starting_date AND l.ending_date;
        `
    );

    return result.rows;
};