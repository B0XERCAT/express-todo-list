const mongoose = require("mongoose");

const TodoStatus = {
  NOT_STARTED: "Not Started",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const todoSchema = new mongoose.Schema({
  id: Number,
  status: {
    type: String,
    enum: Object.values(TodoStatus),
    default: TodoStatus.NOT_STARTED,
  },
  title: String,
  desc: String,
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
