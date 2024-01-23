const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const dotenv = require("dotenv");

dotenv.config();

const Todo = require("./models/Todo");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.patch("/api/todo/check/:id", (req, res) => {
  Todo.findOne({ id: req.params.id })
    .then((todo) => {
      if (!todo) {
        return res.status(404).json({ message: "Todo not found" });
      }
      const currentCompleted = todo.completed;
      todo.completed = !currentCompleted;
      return todo.save();
    })
    .then((updatedTodo) => {
      res.json({ message: "Todo updated successfully", todo: updatedTodo });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    });
});

app.delete("/api/todo/delete/:id", async (req, res) => {
  try {
    const result = await Todo.deleteOne({ id: req.params.id });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/todo/submit", async (req, res) => {
  try {
    const todo = new Todo({
      id: req.body.id,
      title: req.body.title,
      completed: false,
    });
    const result = await todo.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/api/todo", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log("Server started!");
});
