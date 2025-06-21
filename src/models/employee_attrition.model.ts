import { pool } from "../config/db";

interface Attrition{
    employee_id: string,
    employee_name: string,
    Age: number;
    DistanceFromHome: number;
    Education: number;
    JobSatisfaction: number;
    MonthlyIncome: number;
    OverTime: number;
    PercentSalaryHike: number;
    TotalWorkingYears: number;
    YearsAtCompany: number;
    WorkLifeBalance: number
}

export const saveEmployeeAttrition = async (attrition: Attrition): Promise<Attrition> => {
    const {
        employee_id,
        employee_name,
        Age,
        DistanceFromHome,
        Education,
        JobSatisfaction,
        MonthlyIncome,
        OverTime,
        PercentSalaryHike,
        TotalWorkingYears,
        YearsAtCompany,
        WorkLifeBalance
    } = attrition;

    const result = await pool.query(
        `
            INSERT INTO employee_attrition(
                employee_id, employee_name, "Age", "DistanceFromHome", "Education",
                "JobSatisfaction", "MonthlyIncome", "OverTime", "PercentSalaryHike",
                "TotalWorkingYears", "YearsAtCompany", "WorkLifeBalance"
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *
        `,
        [
            employee_id, employee_name, Age, DistanceFromHome,
            Education, JobSatisfaction, MonthlyIncome, OverTime,
            PercentSalaryHike, TotalWorkingYears,
            YearsAtCompany, WorkLifeBalance
        ]
    );

    return result.rows[0];
};