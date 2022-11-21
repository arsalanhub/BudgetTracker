import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BudgetDashboard from "./pages/BudgetDashboard";
import Login from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<BudgetDashboard />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
