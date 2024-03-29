import React, { useState } from 'react';
import './ExpenseForm.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AddExpenseURL } from '../../urls';
import axios from 'axios';
import { toastOptions } from '../../utils/common';

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);
  };

  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value);
  };

  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (enteredTitle === '' || enteredAmount === '' || enteredDate === '') {
      toast.error('Enter complete information of Expense', toastOptions);
      return;
    }

    let userId = JSON.parse(localStorage.getItem('user'))._id;
    let { data } = await axios.post(AddExpenseURL, {
      userId,
      title: enteredTitle,
      amount: enteredAmount,
      date: enteredDate,
    });
    if (data.status) {
      toast.success(data.msg, toastOptions);
    } else toast.error(data.msg, toastOptions);

    setEnteredAmount('');
    setEnteredDate('');
    setEnteredTitle('');
    return;
  };
  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="new-expense__controls">
          <div className="new-expense__control">
            <label>Title</label>
            <input
              type="text"
              value={enteredTitle}
              onChange={titleChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Amount</label>
            <input
              type="number"
              value={enteredAmount}
              min="0.01"
              step="0.01"
              onChange={amountChangeHandler}
            />
          </div>
          <div className="new-expense__control">
            <label>Date</label>
            <input
              type="date"
              value={enteredDate}
              min="2019-01-01"
              max="2022-12-31"
              onChange={dateChangeHandler}
            />
          </div>
        </div>
        <div className="new-expense__actions">
          <button type="button" onClick={props.onCancel}>
            Cancel
          </button>
          <button type="submit">Add Expense</button>
        </div>
      </form>
      <ToastContainer />
    </>
  );
};

export default ExpenseForm;
