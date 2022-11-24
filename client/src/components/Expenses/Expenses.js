import React, { useState } from "react";
import ExpensesChart from "./ExpensesChart";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";

const Expenses = (props) => {
  const [list, setList] = useState(props.item);

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter />
        <ExpensesChart expenses={list} />
        <ExpensesList items={list} />
      </Card>
    </div>
  );
};

export default Expenses;
