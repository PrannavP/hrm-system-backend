import { pool } from "../config/db";

interface Leave {
    leave_type: 'Sick' | 'Annual' | 'Casual';
    starting_date: string;
    ending_date?: string;
    emp_id: string;
    reason: string;
}

export const createNewLeaves = async (leave: Leave): Promise<Leave> => {
    const { leave_type, starting_date, ending_date, emp_id, reason } = leave;

    // console.log(leave_type, starting_date, ending_date, emp_id, reason);

    const result = await pool.query(
        `INSERT INTO leaves (leave_type, starting_date, ending_date, emp_id, reason)
        VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [leave_type, starting_date, ending_date, emp_id, reason]
    );
    return result.rows[0];
}

export const fetchLeavesByEmpId = async(e_id: string) => {
    const result = await pool.query(
        `SELECT * FROM leaves WHERE emp_id = $1`,
        [e_id]
    );
    return result.rows;
};

export const fetchAllEmployeeLeaves = async () => {
    const result = await pool.query(
        `SELECT 
            l.id,
            l.leave_type,
            l.starting_date,
            l.ending_date,
            l.total_days,
            l.emp_id,
            e.first_name || ' ' || e.last_name AS full_name,
            l.reason,
            l.status,
            l.approved_by,
            l.created_at
         FROM leaves l
         JOIN employees e ON l.emp_id = e.emp_id`
    );
    return result.rows;
};

export const changeLeavesStatus = async(leave_id: number, status: string) =>{
    const result = await pool.query(`UPDATE leaves SET status = $1 WHERE id = $2 RETURNING *`, [status, leave_id]);
    return result.rows;
}

export const changeApprovedBy = async(hr_email: string, leave_id: number) => {
    const result = await pool.query(`UPDATE leaves SET approved_by = $1 WHERE id = $2`, [hr_email, leave_id]);
    return result.rows;
};