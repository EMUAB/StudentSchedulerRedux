import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { isAuthenticated, login, getToken } from './AuthService';
import AdminPage from './components/AdminPage.jsx';
import { sampleLogins } from './components/sample-data';

const App = () => {
  const [token, setToken] = useState('');
  const location = useLocation();

  const handleLogin = (blazerID, password) => {
    const loginData = sampleLogins.logins.find(login => login.blazerID === blazerID && login.password === password);
    if (loginData) {
      const token = loginData.id;
      login(token);
      setToken(token);
      if (loginData.role === 'student') {
        navigateTo('/student');
      } else {
        navigateTo('/student'); //TODO change to /instructor
      }
      return true;
    }
    return false;
  }

  const navigateTo = useNavigate();

  // Check isLoggedIn state, if false, redirect to /login
  useEffect(() => {
    const sendUser = async () => {
      let loginData = await sampleLogins.users.find(user => user.id === getToken());
      if (loginData === undefined) {
        navigateTo('/login');
      } else if (loginData.role == 'student') {
        navigateTo('/student');
      } else if (loginData.role == 'instructor') {
        navigateTo('/student'); //TODO change to /instructor
      } else {
        navigateTo('/login');
      }
    }

    if (!isAuthenticated()) {
      navigateTo('/login');
    } else {
      sendUser();
    }
  }, [navigateTo, isAuthenticated, location]);

  return (
    <div>
      <Routes>
        <Route path="/student" element={<Dashboard />} />
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </div>
  );
};

export default App;