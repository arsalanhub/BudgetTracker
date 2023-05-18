const { insert, inOrder } = require('../algo/avl-tree');
const Expenses = require('../model/ExpenseModel');

module.exports.GetYear = async (req, res, next) => {
  try {
    const data = await Expenses.find({});
    let node = null;
    const arr = new Array();
    for (let i = 0; i < data.length; i++) {
      let date = data[i].date.toISOString().split('T')[0];
      let year = date.split('-');
      node = insert(node, parseInt(year[0]));
    }
    inOrder(arr, node);
    return res.json({ data: arr });
  } catch (error) {
    next(error);
  }
};
