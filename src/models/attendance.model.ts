import { pool } from '../config/db'; // Import the pool from config

export const AttendanceModel = {
    // checkin query
    async checkIn(emp_id: string){
        const query = `
            INSERT INTO attendance (emp_id, check_in_time, status)
            VALUES ($1, CURRENT_TIME, 'Present')
            RETURNING *;
        `;

        const { rows } = await pool.query(query, [emp_id]);
        return rows[0];
    },

    // checkout query
    async checkOut(emp_id: string){
        const query = `
            UPDATE attendance
            SET check_out_time = CURRENT_TIME
            WHERE emp_id = $1 AND date = CURRENT_DATE
            RETURNING *;
        `;

        const { rows } = await pool.query(query, [emp_id]);
        return rows[0];
    },

    // get attendance of employees
    async getAttendance(emp_id: string){
        const query = `SELECT * FROM attendance WHERE emp_id = $1 ORDER BY date DESC;`;
        const { rows } = await pool.query(query, [emp_id]);
        return rows;
    },

    // get all employee attendance (HR attendance)
    async getAllAttendance() {
        const query = `
            SELECT 
                a.id, 
                a.emp_id, 
                e.first_name, 
                e.last_name, 
                a.date, 
                a.check_in_time, 
                a.check_out_time, 
                a.total_work_hours, 
                a.status
            FROM attendance a
            LEFT JOIN employees e ON a.emp_id = e.emp_id;
        `;
        const { rows } = await pool.query(query);
        return rows;
    }
};