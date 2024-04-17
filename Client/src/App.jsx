import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { isAuthenticated, login, getToken } from './AuthService';
import AdminPage from './components/AdminPage.jsx';

const App = () => {
  const [token, setToken] = useState('');
  const location = useLocation();

  const handleLogin = (blazerID, password) => {
    const token = blazerID.concat(password);
    // console.log(token);
    login(token);
    setToken(token);
    navigateTo('/');
  }

  const navigateTo = useNavigate();

  // Check isLoggedIn state, if false, redirect to /login
  useEffect(() => {
    if (!isAuthenticated() && location.pathname !== '/login') {
      navigateTo('/login');
    }
  }, [navigateTo, isAuthenticated, location]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};

export default App;