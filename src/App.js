// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Toastify CSS
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Insights from './components/Insights';  // Import Insights component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/insights" element={<Insights />} />  {/* Add Insights route */}
      </Routes>

      {/* ToastContainer to show toast messages */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </Router>
  );
}

export default App;
