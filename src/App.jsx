// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import bg from "./images/jman.svg";
import Todo from "./components/Todo";
  
function App() {
  return (
    <div className="app">
      <img
        src={bg}
        className="container-fluid p-2 m-2 bg-image"
        alt="JMAN Group"
      />
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard/:username" element={<Dashboard />} />
          <Route path="/details/:id" element={<Todo />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
