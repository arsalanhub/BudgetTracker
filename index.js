require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const {
  login,
  register,
  AddExpense,
  GetExpense,
  GetYear,
  FilterYear,
  AddPerson,
  GetPerson,
} = require("./routes");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
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
app.use("/AddExpense", AddExpense);
app.use("/GetExpense", GetExpense);
app.use("/GetYear", GetYear);
app.use("/FilterYear", FilterYear);
app.use("/AddPerson", AddPerson);
app.use("/GetPerson", GetPerson);
app.use("/", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(5000, (req, res) => {
  console.log("Listening to port 5000");
});
