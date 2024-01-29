const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const dotenv = require("dotenv");

dotenv.config();

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

require('./routes/todos.routes')(app);

app.listen(port, () => {
  console.log("Server started!");
});
