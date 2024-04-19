import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { isAuthenticated, login, getToken } from './AuthService';
import { sampleLogins } from './sample-data';

const App = () => {

  const handleLogin = (blazerID, password) => {
    const loginData = sampleLogins.logins.find(login => login.blazerID === blazerID && login.password === password);
    if (loginData) {
      const token = loginData.id;
      login(token);
      if (loginData.role === 'student') {
        navigateTo('/student');
      } else {
        navigateTo('/admin'); //TODO change to /instructor
      }
      return true;
    }
    return false;
  }

  const navigateTo = useNavigate();

  // Check isLoggedIn state, if false, redirect to /login
  useEffect(() => {
    if (!isAuthenticated()) {
      navigateTo('/login');
    } else {
      let loginData = sampleLogins.users.find(user => user.id === getToken());
      if (loginData === undefined) {
        navigateTo('/login');
      } else if (loginData.role == 'student') {
        navigateTo('/student');
      } else if (loginData.role == 'instructor') {
        navigateTo('/admin'); //TODO change to /instructor
      } else {
        navigateTo('/login');
      }
    }
  }, [navigateTo]);

  return (
    <div>
      <Routes>
        <Route path="/student" element={<Dashboard />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
      </Routes>
    </div>
  );
};

export default App;
