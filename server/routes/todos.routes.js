module.exports = (app) => {
  const todos = require("../controllers/todos.controller");
  
  app.patch("/api/todos/:id", todos.update);

  app.delete("/api/todos/:id", todos.delete);

  app.get("/api/todos/:id", todos.findOne);

  app.post("/api/todos", todos.create);

  app.get("/api/todos", todos.findAll);
};
