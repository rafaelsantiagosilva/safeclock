import { Router } from "express";
import {
  createEmployeeAttendance,
  readEmployeeAttendance,
  readEmployeeAttendanceOrdenedByEmployeeIdAndEntryDate,
  updateEmployeeAttendance,
  deleteEmployeeAttendance
} from "./routes.js";

const employeeAttendanceRouter = new Router();

/**
 * @swagger
 * /attendances:
 *   get:
 *     summary: Retorna todos os registros de presença dos funcionários
 *     tags:
 *       - EmployeesAttendances
 *     responses:
 *       200:
 *         description: Success!
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
employeeAttendanceRouter.get("/attendances", readEmployeeAttendance);

/**
 * @swagger
 * /attendances/{employeeId}:
 *   get:
 *     summary: Retorna todos os registros de presença de um funcionário
 *     tags:
 *       - EmployeesAttendances 
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Success!
 *       404:
 *         description: Employee with id not found
 *       500:
 *         description: Internal Server Error
 */
employeeAttendanceRouter.get("/attendances/:employeeId", readEmployeeAttendance);

/**
 * @swagger
 * /attendances-ordered:
 *   get:
 *     summary: Retorna todos os registros de presença dos funcionários ordenados pela data de entrada
 *     tags:
 *       - EmployeesAttendances
 *     responses:
 *       200:
 *         description: Success!
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
employeeAttendanceRouter.get("/attendances-ordered", readEmployeeAttendanceOrdenedByEmployeeIdAndEntryDate);

/**
 * @swagger
 * /attendances-ordered/{employeeId}:
 *   get:
 *     summary: Retorna todos os registros de presença de um funcionário ordenados pela data de entrada
 *     tags:
 *       - EmployeesAttendances
 *     parameters:
 *       - in: path
 *         name: employeeId
 *         required: true
 *         schema:
 *           type: number 
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Success!
 *       404:
 *         description: Employee with id not found
 *       500:
 *         description: Internal Server Error
 */
employeeAttendanceRouter.get("/attendances-ordered/:employeeId", readEmployeeAttendanceOrdenedByEmployeeIdAndEntryDate);

/**
 * @swagger
 * /attendances:
 *   post:
 *     summary: Cria um novo registro de presença de um funcionário
 *     tags:
 *       - EmployeesAttendances
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeAttendance'
 *     responses:
 *       200:
 *         description: Success!
 *       404:
 *         description: Employee with id not found
 *       500:
 *         description: Internal Server Error
 */
employeeAttendanceRouter.post("/attendances", createEmployeeAttendance);

/**
 * @swagger
 * /attendances/{id}:
 *   put:
 *     summary: Atualiza um registro de presença de um funcionário
 *     tags:
 *       - EmployeesAttendances
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do registro de presença
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeAttendance'
 *     responses:
 *       200:
 *         description: Success!
 *       404:
 *         description: Employee Attendance with id not found
 *       500:
 *         description: Internal Server Error
 */
employeeAttendanceRouter.put("/attendances/:id", updateEmployeeAttendance);

/**
 * @swagger
 * /attendances/{id}:
 *   delete:
 *     summary: Deleta um registro de presença de um funcionário
 *     tags:
 *       - EmployeesAttendances
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do registro de presença
 *     responses:
 *       200:
 *         description: Success!
 *       404:
 *         description: Employee Attendance with id not found
 *       500:
 *         description: Internal Server Error
 */
employeeAttendanceRouter.delete("/attendances/:id", deleteEmployeeAttendance);

export default employeeAttendanceRouter;