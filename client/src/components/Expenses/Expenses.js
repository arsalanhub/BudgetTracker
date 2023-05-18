import React, { useEffect, useState } from 'react';
import ExpensesChart from './ExpensesChart';
import './Expenses.css';
import Card from '../UI/Card';
import ExpensesFilter from './ExpensesFilter';
import ExpensesList from './ExpensesList';

const Expenses = (props) => {
  const [list, setList] = useState(props.item);
  const setListFun = (val) => {
    setList(val);
  };
  useEffect(() => {}, [list]);

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter setListFun={setListFun} />
        <ExpensesChart expenses={list} />
        <ExpensesList items={list} />
      </Card>
    </div>
  );
};

export default Expenses;
