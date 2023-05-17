const Expenses = require('../model/ExpenseModel');

module.exports.AddExpense = async (req, res, next) => {
  try {
    const { userId, title, amount, date } = req.body;
    const expenses = await Expenses.create({
      userId,
      title,
      amount,
      date,
    });
    if (expenses) return res.json({ status: true, msg: 'Record Added' });
    else return res.json({ status: false, msg: 'Unable to Add Record' });
  } catch (error) {
    next(error);
  }
};

const filteredData = async (Year, userId) => {
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
    return ele.userId == userId;
  });
  return data;
};

module.exports.GetExpense = async (req, res, next) => {
  try {
    const { userId } = req.body;
    const { Year } = req.query;
    console.log(Year);
    if (Year) {
      let tempData = await filteredData(Year, userId);
      try {
        console.log(tempData);
        return res.json({
          status: true,
          msg: 'Fetching your Expenses',
          data: tempData,
        });
      } catch (error) {
        next(error);
      }
    }
    console.log('here');
    const data = await Expenses.find({
      userId: {
        $all: userId,
      },
    });
    if (!data)
      return res.json({ status: false, msg: 'Failed to Fetch Expenses' });
    else if (data.length < 1)
      return res.json({ status: false, msg: 'No record found!!' });
    return res.json({ status: true, msg: 'Fetching your Expenses', data });
  } catch (error) {
    next(error);
    return res.json({
      status: false,
      msg: 'Cannot fetch expenses, Logout and Login again',
    });
  }
};
