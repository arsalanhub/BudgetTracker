import React, { useEffect, useState } from "react";
import { getYearURL, filterYearURL } from "../../urls";
import axios from "axios";

import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  const [AllOptions, setAllOptions] = useState([]);

  useEffect(() => {
    const fun = async () => {
      let getYear = await axios.get(getYearURL);
      let data = getYear.data.final_date;
      setAllOptions(data);
    };
    fun();
  }, []);

  const YearHandler = async (e) => {
    let { data } = await axios.post(filterYearURL, {
      Year: e.target.value,
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
