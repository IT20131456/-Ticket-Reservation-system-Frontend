import React from "react";
import "./EmployeeLogin.css"; // Import the CSS file for styles (create LoginPanel.css).
import logo from "../../images/logo.png";

function EmployeeLogin() {

    function onSubmitBackoffice(e) {
        e.preventDefault()
        window.location.href = "/backofficehome";
    };

    function onSubmitTravelAgent(e) {
        e.preventDefault()
        window.location.href = "/travelagenthome";
    };
    
  return (
    <div className="login-panel-bg">
        <div className="login-panel">
      <div className="login-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" width={200} height={100} />
        </div>

        <h4>Emplyoee Login</h4>
        <div className="login-form">
        
          <div className="section">
            <h4>Backoffice</h4>
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
            <button className="login-button" onClick={onSubmitBackoffice}>Login</button>
          </div>
          <div className="divider-vertical"></div>
          <div className="section">
            <h4>Travel Agent</h4>
            <div className="divider"></div>
            <div className="input-group">
              <label htmlFor="agent-username">Username</label>
              <input type="text" id="agent-username" />
            </div>
            <div className="input-group">
              <label htmlFor="agent-password">Password</label>
              <input type="password" id="agent-password" />
            </div>
            <p />
            <button className="login-button" onClick={onSubmitTravelAgent}>Login</button>
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

export default EmployeeLogin;
