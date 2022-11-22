const User = require("./model/userModel");
const Expenses = require("./model/ExpenseModel");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await User.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    delete user.password;
    return res.json({ status: true, user });
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const usernameCheck = await User.findOne({ username });
    if (!usernameCheck)
      return res.json({ msg: "Username or Password incorrect", status: false });
    const passwordCheck = await bcrypt.compare(
      password,
      usernameCheck.password
    );
    if (!passwordCheck)
      return res.json({ msg: "Username or Password incorrect", status: false });

    delete usernameCheck.password;
    return res.json({ status: true, user: usernameCheck });
  } catch (error) {
    next(error);
  }
};

module.exports.AddExpense = async (req, res, next) => {
  try {
    const { userId, title, amount, date } = req.body;
    const expenses = await Expenses.create({
      userId,
      title,
      amount,
      date,
    });
    if (expenses) return res.json({ status: true, msg: "Record Added" });
    else return res.json({ status: false, msg: "Unable to Add Record" });
  } catch (error) {
    next(error);
  }
};

module.exports.GetExpense = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const data = await Expenses.find({
      userId: {
        $all: userId,
      },
    });
    if (!data)
      return res.json({ status: false, msg: "Failed to Fetch Expenses" });
    return res.json({ status: true, msg: "Fetching your Expenses", data });
  } catch (error) {
    next(error);
    return res.json({
      status: false,
      msg: "Cannot fetch expenses, Logout and Login again",
    });
  }
};
