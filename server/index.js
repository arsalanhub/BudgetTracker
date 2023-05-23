require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { login, register } = require('./routes/user.routes');
const { AddExpense, GetExpense } = require('./routes/expense.routes');
const { GetYear } = require('./routes/routes');
const app = express();

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Database Connected!!!');
  })
  .catch((error) => {
    console.log(error);
  });

app.use(cors());
app.use(express.json());

app.use('/login', login);
app.use('/register', register);
app.use('/AddExpense', AddExpense);
app.use('/GetExpense', GetExpense);
app.use('/GetYear', GetYear);

const server = app.listen(5000, (req, res) => {
  console.log('Listening to port 5000');
});

module.exports = { app, server };
