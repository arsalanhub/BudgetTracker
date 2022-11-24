import React, { useEffect, useState } from "react";
import { getYearURL } from "../../urls";
import axios from "axios";

import "./ExpensesFilter.css";

const ExpensesFilter = (props) => {
  const [AllOptions, setAllOptions] = useState([]);
  useEffect(() => {
    const fun = async () => {
      let getYear = await axios.get(getYearURL);
      let data = getYear.data.final_date;
      setAllOptions(data);
      console.log(typeof data);
      // for (let i = 0; i < data.length; i++) {
      //   console.log(data[i]);
      //   console.log(typeof data[i]);
      //   setAllOptions((prevElement) => ({
      //     ...prevElement,
      //     data[i],
      //   }));
      // }
    };
    fun();
  }, []);
  return (
    <div className="expenses-filter">
      <div className="expenses-filter__control">
        <label>Filter by year</label>
        <select value={props.selected}>
          {AllOptions.map((ele) => (
            <option>{ele}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ExpensesFilter;
