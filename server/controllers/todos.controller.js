const Todo = require("../models/Todo");

exports.create = async (req, res) => {
  try {
    const todo = new Todo({
      id: req.body.id,
      status: req.body.status,
      title: req.body.title,
      desc: req.body.desc,
    });
    const result = await todo.save();
    res.status(201).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.findAll = async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.findOne = async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.id });
    res.json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.delete = async (req, res) => {
  try {
    const result = await Todo.deleteOne({ id: req.params.id });
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.update = async (req, res) => {
  try {
    const updatedTodo = await Todo.findOneAndUpdate(
      { id: req.params.id },
      {
        $set: {
          status: req.body.status,
          title: req.body.title,
          desc: req.body.desc,
        },
      },
      { new: true, useFindAndModify: false }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.json({ message: "Todo updated successfully", todo: updatedTodo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
