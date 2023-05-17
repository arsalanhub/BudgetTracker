const Expenses = require("../model/ExpenseModel");

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
