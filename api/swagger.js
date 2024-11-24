import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Safelock - API Documentation",
      version: "1.0.0",
      description: "API documentation"
    },
    tags: [
      { name: "Employees", description: "Rotas para o CRUD de funcionários" },
      { name: "EmployeesAttendances", description: "Rotas para o CRUD de comparecimento dos funcionários" }
    ],
    components: {
      schemas: {
        Employee: {
          type: "object",
          required: ["name", "password"],
          properties: {
            name: { type: "string", description: "Nome do funcionário", example: "João Silva" },
            password: { type: "string", description: "Senha do funcionário", example: "123456" },
          }
        },
        EmployeeAttendance: {
          type: "object",
          required: ["employeeId"],
          properties: {
            employeeId: { type: "number", description: "ID do funcionário", example: 3 },
            entryDate: { type: "string", description: "Data da entrada em UTC", example: "" },
            exitDate: { type: "string", description: "Data da saída em UTC", example: "" },
          }
        }
      }
    },
  },
  apis: ["./routers/**/*.js"],
};

const swaggerDocs = swaggerJsdoc(options);

export { swaggerUi, swaggerDocs };