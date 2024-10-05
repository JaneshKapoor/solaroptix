// src/components/Dashboard.js
import React from 'react';
import { Button } from 'antd';  // Using Ant Design Button component
import { signOut } from 'firebase/auth';  // Import signOut method from Firebase
import { auth } from '../firebase';  // Firebase auth
import { useNavigate } from 'react-router-dom';  // For redirection after logout
import { toast } from 'react-toastify';  // To display notifications

const Dashboard = () => {
  const navigate = useNavigate();

  // Handle logout functionality
  const handleLogout = async () => {
    try {
      await signOut(auth);
      toast.success("Logged out successfully!");
      navigate('/');  // Redirect to login page
    } catch (error) {
      toast.error("Logout failed: " + error.message);
    }
  };

  return (
    <div>
      <h1>Welcome to the SolarOptix Dashboard</h1>
      <Button type="primary" onClick={handleLogout}>Logout</Button>
    </div>
  );
};

export default Dashboard;
