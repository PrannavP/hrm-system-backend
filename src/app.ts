import express from "express";
import cors from "cors";

import checkinRoutes from "./routes/checkinCheckoutRoutes";
import employeeRoutes from './routes/employeeRoutes';
import attendanceRoutes from "./routes/attendanceRoutes";
import leavesRoutes from "./routes/leavesRoutes";
import passwordResetRoutes from "./routes/passwordResetRequestRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", checkinRoutes);
app.use("/api", employeeRoutes);
app.use("/api", attendanceRoutes);
app.use("/api", leavesRoutes);
app.use("/api", passwordResetRoutes);

export default app;