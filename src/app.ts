import express from 'express';
import cors from 'cors';

import checkinRoutes from './routes/checkinCheckoutRoutes';
import employeeRoutes from './routes/employeeRoutes';
import attendanceRoutes from './routes/attendanceRoutes';
import leavesRoutes from './routes/leavesRoutes';
import passwordResetRoutes from './routes/passwordResetRequestRoutes';
import checkInTimerSync from './routes/timerRoutes';
import humanResourcesRoutes from './routes/human_resourcesRoutes';
import tasksRoutes from './routes/tasksRoute';
import employeeAttritionRoutes from "./routes/employeeAttritionRoutes";
import employeePerformanceRoutes from "./routes/employeePerformanceRoutes";

const app = express();

app.use(cors());
app.use(express.json());

// Add this before your routes
app.use('/uploads', express.static('uploads'));

app.use('/api', checkinRoutes);
app.use('/api', employeeRoutes);
app.use('/api', attendanceRoutes);
app.use('/api', leavesRoutes);
app.use('/api', passwordResetRoutes);
app.use('/api', checkInTimerSync);

// tasks related routes
app.use('/api', tasksRoutes);

// human resources related routes
app.use('/api', humanResourcesRoutes);

// HR Employee Attrition Route
app.use('/api', employeeAttritionRoutes);

// HR Employee Performance Route
app.use('/api', employeePerformanceRoutes);

export default app;
