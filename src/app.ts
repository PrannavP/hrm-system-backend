import express from "express";
import cors from "cors";

import checkinRoutes from "./routes/checkinCheckoutRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", checkinRoutes);

export default app;