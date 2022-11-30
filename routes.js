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
      return res.status(404).json({ msg: "Username or Password incorrect", status: false });
    const passwordCheck = await bcrypt.compare(
      password,
      usernameCheck.password
    );
    if (!passwordCheck)
      return res.status(404).json({ msg: "Username or Password incorrect", status: false });

    delete usernameCheck.password;
    // console.log(usernameCheck)
    return res.status(200).json({ status: true, user: usernameCheck });
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
    else if (data.length < 1)
      return res.json({ status: false, msg: "No record found!!" });
    return res.json({ status: true, msg: "Fetching your Expenses", data });
  } catch (error) {
    next(error);
    return res.json({
      status: false,
      msg: "Cannot fetch expenses, Logout and Login again",
    });
  }
};

module.exports.GetYear = async (req, res, next) => {
  try {
    const data = await Expenses.aggregate([
      {
        $project: {
          _id: 0,
          Year: { $year: "$date" },
        },
      },
    ]);
    const distinct_date = new Set();
    let final_date = [];
    for (let i = 0; i < data.length; i++) {
      if (distinct_date.has(data[i].Year)) continue;
      distinct_date.add(data[i].Year);
      final_date.push(data[i].Year);
    }
    return res.json({ final_date });
  } catch (error) {
    next(error);
  }
};

module.exports.FilterYear = async (req, res, next) => {
  try {
    let { Year, userId } = req.body;
    let stDate = `${Year}-01-01T00:00:00.000Z`;
    let edDate = `${Year}-12-31T00:00:00.000Z`;
    let data = await Expenses.aggregate([
      {
        $match: {
          $and: [
            {
              date: {
                $gte: new Date(stDate),
              },
            },
            {
              date: {
                $lte: new Date(edDate),
              },
            },
          ],
        },
      },
    ]);

    data = data.filter((ele) => {
      console.log(ele);
      return ele.userId == userId;
    });
    return res.json({ data });
  } catch (error) {
    next(error);
  }
};
