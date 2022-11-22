require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const { login, register } = require("./routes");
const cors = require("cors");
const app = express();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected!!!");
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(express.json());

app.use("/login", login);
app.use("/register", register);

app.listen(5000, (req, res) => {
  console.log("Listening to port 5000");
});
