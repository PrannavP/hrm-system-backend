import express, { Router } from 'express';
import multer from 'multer';
import {
    deleteEmployeeController,
    login,
    register,
    getEmployeeProfile,
    getLeavesOfEmployee,
    getAttendanceDataOfEmployee,
    getEmployeeBasicDetailsController,
} from '../controllers/employee.controller';

const router: Router = express.Router();

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
});

// File filter for images only
const fileFilter = (req: any, file: any, cb: any) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Only image files are allowed!'), false);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
});

router.post('/login-employee', login as express.RequestHandler);
router.post('/create-employee', upload.single('image'), register);
router.delete('/delete-employee/:emp_id', deleteEmployeeController as express.RequestHandler);
router.post('/get-employee', getEmployeeProfile);
router.post('/get-employee-leaves', getLeavesOfEmployee);
router.post('/get-employee-attendance', getAttendanceDataOfEmployee);
router.get('/get-employee-basic_details', getEmployeeBasicDetailsController);

export default router;
