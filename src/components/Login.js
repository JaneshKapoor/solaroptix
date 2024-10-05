// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';  // Firebase authentication methods
import { auth, provider } from '../firebase';  // Firebase services
import { Button, Input } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';  // For navigation

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle Email/Password login
  const handleEmailLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate('/dashboard');  // Redirect to dashboard
    } catch (error) {
      toast.error("Login failed: " + error.message);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, provider);
      toast.success("Logged in with Google!");
      navigate('/dashboard');  // Redirect to dashboard
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    }
  };

  // Navigate to Signup page if user doesn't have an account
  const handleNavigateToSignup = () => {
    navigate('/signup');
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px' }}>
      <h2>Login</h2>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input.Password
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ marginTop: '10px' }}
      />
      <Button type="primary" onClick={handleEmailLogin} style={{ marginTop: '20px', width: '100%' }}>
        Login with Email
      </Button>
      <Button type="default" onClick={handleGoogleLogin} style={{ marginTop: '10px', width: '100%' }}>
        Login with Google
      </Button>

      <p style={{ marginTop: '20px' }}>
        Don't have an account?{' '}
        <span onClick={handleNavigateToSignup} style={{ color: 'blue', cursor: 'pointer' }}>
          Sign up now
        </span>
      </p>
    </div>
  );
};

export default Login;
