const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: { type: String, required: true },
  details: { type: String },
  due: {type: String },
  user: { type: String },
  completed: { type: Boolean, required: true },
  parentTask: { type: String }
});

const NewTask = mongoose.model("Task", taskSchema);

module.exports = NewTask;
