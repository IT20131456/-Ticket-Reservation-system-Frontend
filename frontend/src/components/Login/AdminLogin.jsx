import React from "react";
import "./AdminLogin.css"; // Import the CSS file for styles (create LoginPanel.css).
import logo from "../../images/logo.png";

function AdminLogin() {

    function onSubmitAdmin(e) {
        e.preventDefault()
        window.location.href = "/backoffice";
    };
    
  return (
    <div className="login-panel-bg">
        <div className="login-panel">
      <div className="login-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" width={200} height={100} />
        </div>
        <div className="login-form">
        
          <div className="section">
            <h4>Admin Login</h4>
            <div className="divider"></div>
            <div className="input-group">
              <label htmlFor="backoffice-username">Username</label>
              <input type="text" id="backoffice-username"/>
            </div>
            <div className="input-group">
              <label htmlFor="backoffice-password">Password</label>
              <input type="password" id="backoffice-password" />
            </div>
            <p />
            <button className="login-button" onClick={onSubmitAdmin}>Login</button>
          </div>
        </div>
        <p />
        <p />
        <p />
      </div>
    </div>
    </div>
  );
}

export default AdminLogin;
