import axios from "axios";
import { Request, Response } from "express";
import { saveEmployeePerformance } from "../models/employee_performance.model";

export const SaveEmployeePerformanceController = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            employee_name,
            EmpID,
            Age,
            AgeGroup,
            BusinessTravel,
            Department,
            DistanceFromHome,
            Education,
            EducationField,
            EnvironmentSatisfaction,
            Gender,
            JobRole,
            JobInvolvement,
            JobLevel,
            JobSatisfaction,
            MaritalStatus,
            MonthlyIncome,
            SalarySlab,
            NumCompaniesWorked,
            OverTime,
            PercentSalaryHike,
            StockOptionLevel,
            TotalWorkingYears,
            TrainingTimesLastYear,
            YearsAtCompany,
            YearsInCurrentRole,
            YearsSinceLastPromotion,
            YearsWithCurrManager,
            AttendanceScore,
            WorkLifeBalance,
            ManagerRating,
            Attrition,
            DailyRate,
            HourlyRate,
            MonthlyRate,
            RelationshipSatisfaction
        } = req.body;

        // Basic required field validation
        if (
            EmpID === undefined || Age === undefined || AgeGroup === undefined || BusinessTravel === undefined ||
            Department === undefined || DistanceFromHome === undefined || Education === undefined || EducationField === undefined ||
            EnvironmentSatisfaction === undefined || Gender === undefined || JobRole === undefined || JobInvolvement === undefined ||
            JobLevel === undefined || JobSatisfaction === undefined || MaritalStatus === undefined || MonthlyIncome === undefined ||
            SalarySlab === undefined || NumCompaniesWorked === undefined || OverTime === undefined || PercentSalaryHike === undefined ||
            StockOptionLevel === undefined || TotalWorkingYears === undefined || TrainingTimesLastYear === undefined ||
            YearsAtCompany === undefined || YearsInCurrentRole === undefined || YearsSinceLastPromotion === undefined ||
            YearsWithCurrManager === undefined || AttendanceScore === undefined || WorkLifeBalance === undefined ||
            ManagerRating === undefined || Attrition === undefined || DailyRate === undefined || HourlyRate === undefined ||
            MonthlyRate === undefined || RelationshipSatisfaction === undefined
        ) {
            res.status(400).json({
                message: "All the fields are required."
            });
            return;
        }

        // Save to DB
        const savedPerformance = await saveEmployeePerformance({
            employee_name,
            EmpID,
            Age,
            AgeGroup,
            BusinessTravel,
            Department,
            DistanceFromHome,
            Education,
            EducationField,
            EnvironmentSatisfaction,
            Gender,
            JobRole,
            JobInvolvement,
            JobLevel,
            JobSatisfaction,
            MaritalStatus,
            MonthlyIncome,
            SalarySlab,
            NumCompaniesWorked,
            OverTime,
            PercentSalaryHike,
            StockOptionLevel,
            TotalWorkingYears,
            TrainingTimesLastYear,
            YearsAtCompany,
            YearsInCurrentRole,
            YearsSinceLastPromotion,
            YearsWithCurrManager,
            AttendanceScore,
            WorkLifeBalance,
            ManagerRating,
            Attrition,
            DailyRate,
            HourlyRate,
            MonthlyRate,
            RelationshipSatisfaction
        });

        // Call Flask API (if available)
        const flaskResponse = await axios.post("http://127.0.0.1:5000/predict_performance", {
            Age,
            Education,
            MonthlyIncome,
            JobSatisfaction,
            EnvironmentSatisfaction,
            AttendanceScore,
            ManagerRating,
            YearsAtCompany,
            OverTime,
            TrainingTimesLastYear
        });

        const prediction = flaskResponse.data;

        res.status(201).json({
            savedData: savedPerformance,
            prediction: prediction
        });

    } catch (error) {
        console.error("Error occurred while saving employee performance.", error);
        res.status(500).json({
            message: "Error while saving employee performance.",
            error: (error as Error).message
        });
    }
};