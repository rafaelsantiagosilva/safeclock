import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AUTO_INCREMENT = mongooseSequence(mongoose);

const EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

EmployeeSchema.plugin(AUTO_INCREMENT, { inc_field: 'id' });

const Employee = mongoose.model('employees', EmployeeSchema);

export { EmployeeSchema, Employee };