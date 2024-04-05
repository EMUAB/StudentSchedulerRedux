import React, {useState, useEffect} from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigateTo('/');
  };

  const navigateTo = useNavigate();

  // Check isLoggedIn state, if false, redirect to /login
  useEffect(() => {
    if (!isLoggedIn) {
      navigateTo('/login');
    } else {
      navigateTo('/');
    }
  }, [isLoggedIn, navigateTo]);

  return (
      <div>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </div>
  );
};

export default App;
