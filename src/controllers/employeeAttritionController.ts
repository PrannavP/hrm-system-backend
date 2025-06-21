import axios from "axios";
import { Request, Response } from "express";
import { saveEmployeeAttrition } from "../models/employee_attrition.model";

export const SaveEmployeeAttritionController = async (req: Request, res: Response): Promise<void> => {
    try {
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
        } = req.body;

        // Validate required fields
        if (
            employee_id === undefined || employee_name === undefined || Age === undefined ||
            DistanceFromHome === undefined || Education === undefined || JobSatisfaction === undefined ||
            MonthlyIncome === undefined || OverTime === undefined || PercentSalaryHike === undefined ||
            TotalWorkingYears === undefined || YearsAtCompany === undefined || WorkLifeBalance === undefined
        ) {
            res.status(400).json({
                message: "All the fields are required."
            });
            return;
        }

        // Create new employee attrition and save in database
        const newEmployeeAttrition = await saveEmployeeAttrition({
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
        });

        // Call the model prediction flask api endpoint
        const flaskResponse = await axios.post("http://127.0.0.1:5000/predict_attrition", {
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
        });

        const prediction = flaskResponse.data;

        res.status(201).json({
            savedData: newEmployeeAttrition,
            prediction: prediction
        });
    } catch (error) {
        console.error('Error occured while saving employee attrition.', error);
        res.status(500).json({ message: "Error while saving employee attrition.", error: (error as Error).message });
    }
};
