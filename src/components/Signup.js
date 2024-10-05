// src/components/Signup.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, provider, db } from '../firebase';  // Import Firestore (db)
import { Button, Input } from 'antd';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';  // Firestore methods

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Handle Email/Password Sign Up
  const handleSignup = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
        photoURL: user.photoURL
      });

      toast.success("Signup Successful! User doc created.");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Sign-up failed: " + error.message);
    }
  };

  // Handle Google Sign Up
  const handleGoogleSignup = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      
      // Create a user document in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        createdAt: new Date(),
      });

      toast.success("Signup Successful with Google! User doc created.");
      navigate('/dashboard');
    } catch (error) {
      toast.error("Google sign-up failed: " + error.message);
    }
  };

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
