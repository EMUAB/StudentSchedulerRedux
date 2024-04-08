import React, { useState, useEffect } from 'react';
import Courses from './Courses';
import Login from './Login';
import './Login.css';
import Calendar from "./Calendar";


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="App">
      {isLoggedIn ? (
        <Courses /> // Render Courses component when logged in
        ) : (
       <Login onLogin={() => setIsLoggedIn(true)} /> // Update state on successful login
    )}
  </div>
  );
};

export default App;