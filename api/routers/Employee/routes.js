import { Employee } from "../../models/EmployeeSchema.js";

export const createEmployee = async (req, res) => {
  const newEmployee = new Employee({
    name: req.body.name,
    password: req.body.password,
  });

  try {
    const savedEmployee = await newEmployee.save();
    res.status(200).json(savedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const readEmployees = async (req, res) => {
  const id = req.params.id;

  try {
    const employees = id ? await Employee.findOne({ id }) : await Employee.find();
    if (!employees) {
      res.status(404).json({ message: `Employee with id '${id}' don't exists` });
      return;
    }

    res.status(200).json(employees);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const updateEmployee = async (req, res) => {
  const id = req.params.id;

  try {
    const employee = await Employee.findOne({ id });

    if (!employee) {
      res.status(404).json({message: `Employee with id '${id}' don't exists`});
      return;
    }

    employee.name = req.body.name;
    employee.password = req.body.password;
    const updatedEmployee = await employee.save();
    res.status(200).json(updatedEmployee);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const deleteEmployee = async (req, res) => {
  try {
    const deletedEmployee = await Employee.findOneAndDelete({ id: req.params.id });

    if (!deletedEmployee)
      return res.status(404).json({ message: `Employee with id ${req.params.id} not found` });

    res.status(200).json({ message: `Employee with id ${req.params.id} has been deleted` });
  } catch (err) {
    res.status(500).json(err);
  }
}