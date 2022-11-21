import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BudgetDashboard from "./pages/BudgetDashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<BudgetDashboard />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
