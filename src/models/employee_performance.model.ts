import { pool } from "../config/db";

interface PerformanceEvaluation {
    employee_name: string; // <-- Add this
    EmpID: string;
    Age: number;
    AgeGroup: string;
    BusinessTravel: string;
    Department: string;
    DistanceFromHome: number;
    Education: number;
    EducationField: string;
    EnvironmentSatisfaction: number;
    Gender: string;
    JobRole: string;
    JobInvolvement: number;
    JobLevel: string;
    JobSatisfaction: number;
    MaritalStatus: string;
    MonthlyIncome: number;
    SalarySlab: string;
    NumCompaniesWorked: number;
    OverTime: string;
    PercentSalaryHike: number;
    StockOptionLevel: number;
    TotalWorkingYears: number;
    TrainingTimesLastYear: number;
    YearsAtCompany: number;
    YearsInCurrentRole: number;
    YearsSinceLastPromotion: number;
    YearsWithCurrManager: number;
    AttendanceScore: number;
    WorkLifeBalance: number;
    ManagerRating: number;
    Attrition: string;
    DailyRate: number;
    HourlyRate: number;
    MonthlyRate: number;
    RelationshipSatisfaction: number;
}

export const saveEmployeePerformance = async (
    data: PerformanceEvaluation
): Promise<PerformanceEvaluation> => {
    const result = await pool.query(
        `
            INSERT INTO employee_performance (
                employee_name, "EmpID", "Age", "AgeGroup", "BusinessTravel", "Department", "DistanceFromHome",
                "Education", "EducationField", "EnvironmentSatisfaction", "Gender", "JobRole",
                "JobInvolvement", "JobLevel", "JobSatisfaction", "MaritalStatus", "MonthlyIncome",
                "SalarySlab", "NumCompaniesWorked", "OverTime", "PercentSalaryHike", "StockOptionLevel",
                "TotalWorkingYears", "TrainingTimesLastYear", "YearsAtCompany", "YearsInCurrentRole",
                "YearsSinceLastPromotion", "YearsWithCurrManager", "AttendanceScore", "WorkLifeBalance",
                "ManagerRating", "Attrition", "DailyRate", "HourlyRate", "MonthlyRate", "RelationshipSatisfaction"
            )
            VALUES (
                $1, $2, $3, $4, $5, $6,
                $7, $8, $9, $10, $11,
                $12, $13, $14, $15, $16,
                $17, $18, $19, $20, $21,
                $22, $23, $24, $25, $26,
                $27, $28, $29, $30,
                $31, $32, $33, $34, $35, $36
            )
            RETURNING *
        `,
        [
            data.employee_name,
            data.EmpID,
            data.Age,
            data.AgeGroup,
            data.BusinessTravel,
            data.Department,
            data.DistanceFromHome,
            data.Education,
            data.EducationField,
            data.EnvironmentSatisfaction,
            data.Gender,
            data.JobRole,
            data.JobInvolvement,
            data.JobLevel,
            data.JobSatisfaction,
            data.MaritalStatus,
            data.MonthlyIncome,
            data.SalarySlab,
            data.NumCompaniesWorked,
            data.OverTime,
            data.PercentSalaryHike,
            data.StockOptionLevel,
            data.TotalWorkingYears,
            data.TrainingTimesLastYear,
            data.YearsAtCompany,
            data.YearsInCurrentRole,
            data.YearsSinceLastPromotion,
            data.YearsWithCurrManager,
            data.AttendanceScore,
            data.WorkLifeBalance,
            data.ManagerRating,
            data.Attrition,
            data.DailyRate,
            data.HourlyRate,
            data.MonthlyRate,
            data.RelationshipSatisfaction
        ]
    );

    return result.rows[0];
};
