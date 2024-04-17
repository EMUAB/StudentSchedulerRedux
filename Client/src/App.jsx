import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { isAuthenticated, login, getToken } from './AuthService';

const App = () => {
  const [token, setToken] = useState('');

  const handleLogin = (blazerID, password) => {
    const token = blazerID.concat(password);
    // console.log(token);
    login(token);
    setToken(token);
    navigateTo('/student');
  }

  const navigateTo = useNavigate();

  // Check isLoggedIn state, if false, redirect to /login
  useEffect(() => {
    if (!isAuthenticated()) {
      navigateTo('/login');
    } else {
      navigateTo('/student');
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
