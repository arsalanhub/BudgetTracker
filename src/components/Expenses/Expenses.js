import React, { useContext, useEffect, useState } from "react";
import ExpensesChart from "./ExpensesChart";
import "./Expenses.css";
import Card from "../UI/Card";
import ExpensesFilter from "./ExpensesFilter";
import ExpensesList from "./ExpensesList";
import { AppContext } from "../../context/Context";

const Expenses = (props) => {
  const [list, setList] = useState(props.item);
  const { data } = useContext(AppContext);
  const setListFun = (val) => {
    setList(val);
  };
  useEffect(() => {}, [list]);
  useEffect(() => {
    setList(data.data);
  }, [data]);

  return (
    <div>
      <Card className="expenses">
        <ExpensesFilter setListFun={setListFun} />
        {list && <ExpensesChart expenses={list} />}
        {!list && <ExpensesChart expenses={[]} />}
        {list && <ExpensesList items={list} />}
        {!list && <ExpensesList items={[]} />}
      </Card>
    </div>
  );
};

export default Expenses;
