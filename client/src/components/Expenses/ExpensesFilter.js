import React, { useEffect, useState } from 'react';
import { GetExpenseURL, getYearURL } from '../../urls';
import axios from 'axios';

import './ExpensesFilter.css';

const ExpensesFilter = (props) => {
  const [AllOptions, setAllOptions] = useState([]);

  useEffect(() => {
    const fun = async () => {
      let { data } = await axios.get(getYearURL);
      setAllOptions(data.data);
    };
    fun();
  }, []);

  const YearHandler = async (e) => {
    let userId = JSON.parse(localStorage.getItem('user'))._id;
    let { data } = await axios.post(`${GetExpenseURL}?Year=${e.target.value}`, {
      userId,
    });
    props.setListFun(data.data);
  };

  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        {AllOptions.length > 0 && (
          <select onChange={YearHandler}>
            {AllOptions.map((ele) => {
              return <option key={ele}>{ele}</option>;
            })}
          </select>
        )}
      </div>
    </div>
  );
};

export default ExpensesFilter;
