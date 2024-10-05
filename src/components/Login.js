// src/components/Login.js
import React, { useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider, db } from '../firebase';
import { Button, Input } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';  // Firestore methods

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Check if user doc exists and create it if missing
  const checkUserDoc = async (user) => {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (!userDocSnap.exists()) {
      // Create the user document in Firestore if it doesn't exist
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
        photoURL: user.photoURL
      });
      toast.success("User doc created.");
    }
  };

  // Handle Email/Password login
  const handleEmailLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user doc exists
      await checkUserDoc(user);

      toast.success("Login Successful!");
      navigate('/dashboard');
    } catch (error) {
      if (error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        toast.error("Invalid Credentials");
      } else {
        toast.error("Login failed: " + error.message);
      }
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;

      // Check if user doc exists
      await checkUserDoc(user);

      toast.success("Login Successful with Google!");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Google login failed: " + error.message);
    }
  };

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
