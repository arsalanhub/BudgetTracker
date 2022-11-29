import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalState from "./context/GlobalState";
import BudgetDashboard from "./pages/BudgetDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <GlobalState>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/dashboard" element={<BudgetDashboard />}></Route>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </GlobalState>
  );
};

export default App;
