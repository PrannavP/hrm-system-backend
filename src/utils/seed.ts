import { pool } from '../config/db';
import bcrypt from 'bcryptjs';

export const resetAndSeedDatabase = async () => {
    const tables = [
        'tasks',
        'leaves',
        'employee_attrition',
        'employee_performance',
        'employees',
        'human_resources'
    ];

    for (const table of tables) {
        await pool.query(`TRUNCATE TABLE ${table} RESTART IDENTITY CASCADE;`);
    }

    // Hash passwords
    const hashPassword = async (plain: string) => await bcrypt.hash(plain, 10);

    // Seed employees
    const employees = [
        { emp_id: 'E001', first_name: 'Prakash', last_name: 'Shrestha', email: 'prakash.shrestha@employee.com', department: 'IT', role: 'Developer', password: 'password1' },
        { emp_id: 'E002', first_name: 'Sujata', last_name: 'Karki', email: 'sujata.karki@employee.com', department: 'HR', role: 'Analyst', password: 'password2' },
        { emp_id: 'E003', first_name: 'Bibek', last_name: 'Thapa', email: 'bibek.thapa@employee.com', department: 'Finance', role: 'Accountant', password: 'password3' },
        { emp_id: 'E004', first_name: 'Manisha', last_name: 'Rai', email: 'manisha.rai@employee.com', department: 'Marketing', role: 'Executive', password: 'password4' },
        { emp_id: 'E005', first_name: 'Sandeep', last_name: 'Lama', email: 'sandeep.lama@employee.com', department: 'IT', role: 'Tester', password: 'password5' },
        { emp_id: 'E006', first_name: 'Ramesh', last_name: 'Gurung', email: 'ramesh.gurung@employee.com', department: 'HR', role: 'Recruiter', password: 'password6' },
        { emp_id: 'E007', first_name: 'Anju', last_name: 'Sharma', email: 'anju.sharma@employee.com', department: 'Finance', role: 'Clerk', password: 'password7' },
        { emp_id: 'E008', first_name: 'Prannav', last_name: 'Panta', email: 'prannav.panta@employee.com', department: 'IT', role: 'Support', password: 'password8' },
        { emp_id: 'E009', first_name: 'Sarita', last_name: 'Maharjan', email: 'sarita.maharjan@employee.com', department: 'Marketing', role: 'Designer', password: 'password9' },
        { emp_id: 'E010', first_name: 'Dipesh', last_name: 'Bista', email: 'dipesh.bista@employee.com', department: 'IT', role: 'Developer', password: 'password10' },
        { emp_id: 'E011', first_name: 'Sunita', last_name: 'Basnet', email: 'sunita.basnet@employee.com', department: 'HR', role: 'Coordinator', password: 'password11' },
        { emp_id: 'E012', first_name: 'Kamal', last_name: 'Khadka', email: 'kamal.khadka@employee.com', department: 'Finance', role: 'Accountant', password: 'password12' },
        { emp_id: 'E013', first_name: 'Bishal', last_name: 'Shah', email: 'bishal.shah@employee.com', department: 'Marketing', role: 'Executive', password: 'password13' },
        { emp_id: 'E014', first_name: 'Rita', last_name: 'Tamang', email: 'rita.tamang@employee.com', department: 'IT', role: 'Tester', password: 'password14' },
        { emp_id: 'E015', first_name: 'Nabin', last_name: 'Shrestha', email: 'nabin.shrestha@employee.com', department: 'HR', role: 'Recruiter', password: 'password15' }
    ];

    for (const emp of employees) {
        const hashedPassword = await hashPassword(emp.password);
        await pool.query(
            `INSERT INTO employees (emp_id, first_name, last_name, email, department, role, password)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             ON CONFLICT (emp_id) DO NOTHING;`,
            [emp.emp_id, emp.first_name, emp.last_name, emp.email, emp.department, emp.role, hashedPassword]
        );
    }

    // Seed human_resources
    const hrs = [
        { first_name: 'Suman', last_name: 'Shrestha', email: 'suman.shrestha@hr.com', password: 'hrpass1' },
        { first_name: 'Mina', last_name: 'Khadka', email: 'mina.khadka@hr.com', password: 'hrpass2' },
        { first_name: 'Rajesh', last_name: 'Tamang', email: 'rajesh.tamang@hr.com', password: 'hrpass3' },
        { first_name: 'Bimala', last_name: 'Gurung', email: 'bimala.gurung@hr.com', password: 'hrpass4' },
        { first_name: 'Prakash', last_name: 'Basnet', email: 'prakash.basnet@hr.com', password: 'hrpass5' }
    ];

    for (const hr of hrs) {
        const hashedPassword = await hashPassword(hr.password);
        await pool.query(
            `INSERT INTO human_resources (first_name, last_name, email, password)
             VALUES ($1, $2, $3, $4)
             ON CONFLICT (email) DO NOTHING;`,
            [hr.first_name, hr.last_name, hr.email, hashedPassword]
        );
    }

    // Seed tasks
    await pool.query(`
        INSERT INTO tasks (title, description, assigned_to, assigned_by, priority, status, start_date, due_date, remarks)
        VALUES
            ('Prepare Report', 'Prepare monthly report', 1, 1, 'High', 'Pending', '2025-07-01', '2025-07-10', 'Urgent'),
            ('Update Website', 'Update homepage banner', 2, 2, 'Medium', 'In Progress', '2025-07-02', '2025-07-12', 'Check with marketing'),
            ('Design Brochure', 'Design new brochure for event', 9, 3, 'Low', 'Pending', '2025-07-03', '2025-07-15', 'Coordinate with HR'),
            ('Test Software', 'QA testing for release', 5, 4, 'High', 'Pending', '2025-07-04', '2025-07-14', 'Automate tests'),
            ('Recruitment Drive', 'Conduct interviews', 6, 5, 'Medium', 'Pending', '2025-07-05', '2025-07-20', 'Shortlist candidates')
        ON CONFLICT DO NOTHING;
    `);

    // Seed leaves
    await pool.query(`
        INSERT INTO leaves (leave_type, starting_date, ending_date, emp_id, reason, status)
        VALUES
            ('Sick', '2025-07-05', '2025-07-07', 'E001', 'Flu', 'Pending'),
            ('Annual', '2025-07-15', '2025-07-20', 'E002', 'Vacation', 'Pending'),
            ('Annual', '2025-07-10', '2025-07-12', 'E003', 'Family event', 'Pending'),
            ('Sick', '2025-07-08', '2025-07-09', 'E004', 'Fever', 'Pending'),
            ('Annual', '2025-07-18', '2025-07-22', 'E005', 'Travel', 'Pending')
        ON CONFLICT DO NOTHING;
    `);

    console.log('All tables truncated, identity restarted, and dummy data seeded with hashed passwords!');
};