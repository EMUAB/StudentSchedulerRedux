import React, { useState } from "react";
import logo from '/uab-color-logo.png';
import Button from "react-bootstrap/Button";
import './Login.css';
export const Login = ({ onLogin }) => {
  const [blazerID, setBlazerID] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState('none');

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(blazerID);
    // console.log(password);
    if (!onLogin(blazerID, password)) {
      setShowError('block');
    };
  }


  return (
    <div className="login-container">
      <div className="banner">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="form-container">
        <p className="header1">UAB Central Authentication System</p>
        <p className="header2">Enter your BlazerID and Password:</p>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field-container">
            <label htmlFor="blazerid">Blazer ID</label>
            <input value={blazerID} onChange={(e) => setBlazerID(e.target.value)} type="text" id="username" placeholder="Blazer ID" name="blazerid" />
          </div>
          <div className="field-container">
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e) => setPassword(e.target.value)} onKeyUp={(e) => (e.key === "Enter" ? handleSubmit(e) : null)} type="password" placeholder="********" id="password" name="password" />
            <p style={{color: 'red', display:showError}}>Invalid username/password</p>
          </div>
          <div className="field-container">
            <Button variant="success" onClick={handleSubmit}>Log In</Button>
            <p className="p1">Having trouble logging in?</p>
            <p className="p2">Contact AskIT at 205-996-5555 if you have any problems using this system or your BlazerID</p>
            <p className="p3">Security Notice</p>
            <p className="p4">For security reasons, quit your web browser when finished accessing services that require authentication.
              Be wary of any program or web page that asks for your BlazerID and password. Legitimate UAB web pages promptingfor your BlazerID and
              password should have addresses that begin with https:// (not http:) and contain "uab.edu".Also, your browser should visually indicate
              that you are accessing a secure page, usually a padlock icon. </p>

            <p className="p5">This system is available only for authorized purposes by authorized users. Use for any other purpose may result in disciplinary action
              or criminal prosecution against the user.</p>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Login