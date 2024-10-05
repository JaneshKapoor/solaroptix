// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './firebase';
import { Spin } from 'antd';  // Spinner for loading state

function App() {
  const [user, loading] = useAuthState(auth);  // Track the user’s authentication status

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />  {/* Show a spinner while loading */}
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        {/* If the user is logged in, redirect to the Dashboard */}
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Login />} />

        {/* Signup page */}
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Route - Protected, only accessible if the user is logged in */}
        <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
