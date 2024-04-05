import React, { useState } from "react";
import Login from "./Login";
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
        <Calendar />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
};

export default App;