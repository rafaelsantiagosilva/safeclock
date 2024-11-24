import { Router } from 'express';
import { createEmployee, readEmployees, updateEmployee, deleteEmployee } from './routes.js';

const employeeRouter = new Router();

/**
 * @swagger
 * /employees:
 *   get:
 *     summary: Retorna todos os funcionários
 *     tags: 
 *       - Employees
 *     responses:
 *       200:
 *         description: Success!
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
employeeRouter.get("/employees", readEmployees);

/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Retorna um funcionário específico pelo ID
 *     tags: 
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Success!
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
employeeRouter.get("/employees/:id", readEmployees);

/**
 * @swagger
 * /employees:
 *   post:
 *     summary: Cria um novo funcionário
 *     tags: 
 *       - Employees
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Success!
 *       500:
 *         description: Internal Server Error
 */
employeeRouter.post("/employees", createEmployee);

/**
 * @swagger
 * /employees/{id}:
 *   put:
 *     summary: Atualiza um funcionário
 *     tags: 
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do funcionário
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Employee'
 *     responses:
 *       200:
 *         description: Success!
 *       500:
 *         description: Internal Server Error
 */
employeeRouter.put("/employees/:id", updateEmployee);

/**
 * @swagger
 * /employees/{id}:
 *   delete:
 *     summary: Deleta um funcionário
 *     tags: 
 *       - Employees
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do funcionário
 *     responses:
 *       200:
 *         description: Success!
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
employeeRouter.delete("/employees/:id", deleteEmployee);

export default employeeRouter;