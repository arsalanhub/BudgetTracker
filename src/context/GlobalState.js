import { useState } from "react";
import { AppContext } from "./Context";
import { GetExpenseURL } from "../urls";
import axios from "axios";

export default function GlobalState(props) {
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [typeModal, setTypeModal] = useState("");
  const getData = async () => {
    let userId = JSON.parse(localStorage.getItem("user"))._id;
    let { data } = await axios.post(GetExpenseURL, {
      userId,
    });
    setData(data);
    return data;
  };

  return (
    <AppContext.Provider
      value={{
        getData,
        data,
        openModal,
        setOpenModal,
        typeModal,
        setTypeModal,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
}
