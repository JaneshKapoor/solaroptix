// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';  // Import ToastContainer for notifications
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify CSS for styling
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';

function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Router>
        <Routes>
          {/* Login Route */}
          <Route path="/" element={<Login />} />

          {/* Signup Route */}
          <Route path="/signup" element={<Signup />} />

          {/* Dashboard Route - Protected */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
        </Routes>
      </Router>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} />
    </>
  );
}

export default App;
