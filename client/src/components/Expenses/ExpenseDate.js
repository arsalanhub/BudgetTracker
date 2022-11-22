import React, { useEffect } from "react";
import "./ExpenseDate.css";

const ExpenseDate = (props) => {
  const monthPicker = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let date = props.date.split("-");
  let year = date[0];
  let month = monthPicker[parseInt(date[1]) - 1];
  let day = date[2][0] + date[2][1];
  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
};

export default ExpenseDate;
