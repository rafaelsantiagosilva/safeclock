import mongoose from "mongoose";

const EmployeeAttendanceSchema = new mongoose.Schema({
  employee_id: {
    type: Number,
    required: true
  },
  entry_date: {
    type: Date,
    default: Date.now
  },
  exit_date: {
    type: Date
  }
});

const EmployeeAttendance = mongoose.model('employee_attendances', EmployeeAttendanceSchema);

export { EmployeeAttendanceSchema, EmployeeAttendance };