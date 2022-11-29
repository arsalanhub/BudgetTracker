import React, { useContext, useEffect, useState } from "react";
import Expenses from "../components/Expenses/Expenses";
import NewExpense from "../components/NewExpense/NewExpense";
import styles from "./BudgetDashboard.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GetExpenseURL } from "../urls";
import { AppContext } from "../context/Context";

const BudgetDashboard = () => {
  const [username, setUsername] = useState("");
  const [expenses, setExpenses] = useState();
  const navigate = useNavigate();
  const { getData } = useContext(AppContext);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
    closeButton: false,
  };

  useEffect(() => {
    let user = localStorage.getItem("user");
    if (user == null) return navigate("/");
    user = JSON.parse(user);
    setUsername(user.username);

    const fun = async () => {
      let data = await getData();
      if (data.status) {
        toast.success(data.msg, toastOptions);
        setExpenses(data.data);
      } else toast.error(data.msg, toastOptions);
    };
    fun();
  }, []);

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
        <NewExpense />
        {expenses && <Expenses item={expenses} />}
        {!expenses && <Expenses item={[]} />}
      </div>
      <ToastContainer />
    </>
  );
};

export default BudgetDashboard;
