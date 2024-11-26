import express from "express";
import cors from "cors";
import connectDb from "./connectDb.js";
import { configDotenv } from "dotenv";
import employeeRouter from "./routers/Employee/router.js";
import employeeAttendanceRouter from "./routers/EmployeeAttendance/router.js";
import { swaggerUi, swaggerDocs } from "./swagger.js";

const app = express();

app.use(cors());
app.use(express.json());

configDotenv();
connectDb();

app.use(employeeRouter);
app.use(employeeAttendanceRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(process.env.API_PORT | 3333, '0.0.0.0', () => {
  const apiUrl = `http://${process.env.API_HOST}:${process.env.API_PORT}`;
  const UTC_DATE = Date.now();
  console.log(`> Server is running on ${apiUrl}`);
  console.log(`> Documentation: ${apiUrl + '/api-docs'}`);
  console.info(`> Date: ${new Date(UTC_DATE)} \n> UTC: ${UTC_DATE}`);
});