import { Employee } from "../../models/EmployeeSchema.js";
import { EmployeeAttendance } from "../../models/EmployeeAttendanceSchema.js";

export const createEmployeeAttendance = async (req, res) => {
  const { employeeId } = req.body;

  try {
    const employee = await Employee.findOne({ id: Number(employeeId) });

    if (!employee)
      res.status(404).json({ message: `Employee with ${employeeId} don't exists` });

    const newEmployeeAttendance = new EmployeeAttendance({
      employee_id: employee.id
    });

    const savedEmployee = await newEmployeeAttendance.save();
    res.status(200).json(savedEmployee);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

export const readEmployeeAttendance = async (req, res) => {
  const employeeId = req.params.employeeId;

  try {
    const employeesAttendances = employeeId ? await EmployeeAttendance.find({ employee_id: employeeId }) : await EmployeeAttendance.find();
    if (!employeesAttendances) {
      res.status(404).json({ message: `Employees Attendances of the employee with id '${employeeId}' don't exists` });
      return;
    }

    res.status(200).json(employeesAttendances);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const readEmployeeAttendanceOrdenedByEmployeeIdAndEntryDate = async (req, res) => {
  const employeeId = req.params.employeeId;

  try {
    const employeesAttendances = employeeId
      ? await EmployeeAttendance.find({ employee_id: employeeId }).sort({employee_id: 1, entry_date: 1})
      : await EmployeeAttendance.find().sort({employee_id: 1, entry_date: 1});
      
    if (!employeesAttendances) {
      res.status(404).json({ message: `Employees Attendances of the employee with id '${employeeId}' don't exists` });
      return;
    }

    res.status(200).json(employeesAttendances);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const updateEmployeeAttendance = async (req, res) => {
  const id = req.params.id;
  const { employeeId, entryDate, exitDate } = req.body;

  try {
    const employeeAttendance = await EmployeeAttendance.findOne({ _id: id });

    if (!employeeAttendance) {
      res.status(404).json({ message: `Employee Attendance with _id '${id}' not found` });
      return;
    }

    employeeAttendance.employee_id = employeeId;
    employeeAttendance.entry_date = entryDate;
    employeeAttendance.exit_date = exitDate;
    const updatedEmployeeAttendance = await employeeAttendance.save();
    res.status(200).json(updatedEmployeeAttendance);
  } catch (err) {
    res.status(500).json(err);
  }
}

export const deleteEmployeeAttendance = async (req, res) => {
  try {
    const id = req.params.id;
    const deletedEmployeeAttendance = await EmployeeAttendance.findOneAndDelete({ _id: id });

    if (!deletedEmployeeAttendance) {
      res.status(404).json({ message: `Employee Attendance with id '${id} not found'` });
      return;
    }

    res.status(200).json({ message: `Employee Attendance with the id '${id}' has been deleted` });
  } catch (err) {
    res.status(500).json(err);
  }
}