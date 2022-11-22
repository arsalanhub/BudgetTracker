import React from "react";
import Chart from "../Chart/Chart";

const ExpensesChart = (props) => {
  const chartDataPoints = [
    { id: 0, label: "Jan", value: 0 },
    { id: 1, label: "Feb", value: 0 },
    { id: 2, label: "Mar", value: 0 },
    { id: 3, label: "Apr", value: 0 },
    { id: 4, label: "May", value: 0 },
    { id: 5, label: "Jun", value: 0 },
    { id: 6, label: "Jul", value: 0 },
    { id: 7, label: "Aug", value: 0 },
    { id: 8, label: "Sep", value: 0 },
    { id: 9, label: "Oct", value: 0 },
    { id: 10, label: "Nov", value: 0 },
    { id: 11, label: "Dec", value: 0 },
  ];

  for (const expense of props.expenses) {
    let date = expense.date.split("-")[1];
    const expenseMonth = date - 1;
    chartDataPoints[expenseMonth].value += expense.amount;
  }
  return <Chart dataPoints={chartDataPoints} />;
};

export default ExpensesChart;
