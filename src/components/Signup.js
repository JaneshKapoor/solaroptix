// src/components/Signup.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';  // Create account and Google auth
import { auth, provider } from '../firebase';  // Firebase authentication
import { Button, Input } from 'antd';  // Ant Design UI
import { toast } from 'react-toastify';  // For notifications
import { useNavigate } from 'react-router-dom';  // For navigation

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle Email/Password Sign Up
  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Account created successfully!");
      navigate('/dashboard');  // Redirect to dashboard after sign-up
    } catch (error) {
      toast.error("Sign-up failed: " + error.message);
    }
  };

  // Handle Google Sign Up
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Signed up with Google!");
      navigate('/dashboard');  // Redirect to dashboard after sign-up
    } catch (error) {
      toast.error("Google sign-up failed: " + error.message);
    }
  };

  // Navigate to Login page if user already has an account
  const handleNavigateToLogin = () => {
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Sign Up</h2>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ marginTop: '10px' }}
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: '10px' }}
      />
      <Button type="primary" onClick={handleSignup} style={{ marginTop: '20px', width: '100%' }}>
        Sign Up with Email
      </Button>
      <Button type="default" onClick={handleGoogleSignup} style={{ marginTop: '10px', width: '100%' }}>
        Sign Up with Google
      </Button>

      <p style={{ marginTop: '20px' }}>
        Already have an account?{' '}
        <span onClick={handleNavigateToLogin} style={{ color: 'blue', cursor: 'pointer' }}>
          Login now
        </span>
      </p>
    </div>
  );
};

export default Signup;
