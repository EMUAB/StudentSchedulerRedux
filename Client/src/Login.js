import React, { useState } from "react";
import logo from './UAB.png';
export const Login = (props) => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(email);
    }


return (
    <div className="login-container">
      <div className="banner">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="form-container">
        <h2>UAB Central Authentication System</h2>
        <h3>Enter your BlazerID and Password:</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="field-container">
            <label htmlFor="blazerid">Blazer ID</label>
            <input type="text" id="username" placeholder="Blazer ID" name="blazerid" />
          </div>
          <div className="field-container">
            <label htmlFor="password">Password</label>
            <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" id="password" name="password" />
          </div>
          <div className="field-container">
            <button type="submit">Log In</button>
            <p class="p1">Having trouble logging in?</p>
            <p class="p2">Contact AskIT at 205-996-5555 if you have any problems using this system or your BlazerID</p>
            <p class="p3">Security Notice</p>
            <p class="p4">For security reasons, quit your web browser when finished accessing services that require authentication.
            Be wary of any program or web page that asks for your BlazerID and password. Legitimate UAB web pages promptingfor your BlazerID and
            password should have addresses that begin with https:// (not http:) and contain "uab.edu".Also, your browser should visually indicate
            that you are accessing a secure page, usually a padlock icon. </p>

            <p class="p5">This system is available only for authorized purposes by authorized users.Use for any other purpose may result in disciplinary action
               or criminal prosecution against the user.</p>
          </div>
        </form>
      </div>
    </div>
  );
}


export default Login