import React, { useEffect, useState } from "react";
import Expenses from "../components/Expenses/Expenses";
import NewExpense from "../components/NewExpense/NewExpense";
import styles from "./BudgetDashboard.module.css";
import { useNavigate } from "react-router-dom";

const DUMMY_EXPENSES = [
  { id: "e1", title: "Book", amount: 60, date: new Date(2022, 2, 24) },
  { id: "e2", title: "Pencil", amount: 10, date: new Date(2022, 7, 12) },
  { id: "e3", title: "Pizza", amount: 200, date: new Date(2022, 1, 1) },
  { id: "e4", title: "Juice", amount: 30, date: new Date(2022, 4, 14) },
];

const BudgetDashboard = () => {
  const [username, setUsername] = useState("");
  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);
  const navigate = useNavigate();

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user == null) return navigate("/");
    user = JSON.parse(user);
    setUsername(user.username);
  }, []);

  const addExpensehandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  const logoutHandler = () => {
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <>
      <nav className={styles.navClass}>
        <a>Welcome, {username}</a>
        <button className={styles.buttonClass} onClick={logoutHandler}>
          Logout
        </button>
      </nav>
      <div>
        <NewExpense onAddExpense={addExpensehandler} />
        <Expenses item={expenses} />
      </div>
    </>
  );
};

export default BudgetDashboard;
