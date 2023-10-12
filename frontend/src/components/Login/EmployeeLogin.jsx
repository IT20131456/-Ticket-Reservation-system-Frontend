import React, { useState } from 'react';
import axios from 'axios'; 
import "./EmployeeLogin.css"; // CSS file for styles 
import logo from "../../images/logo.png";

// This component renders the login forms for backend staff and travel agents
function EmployeeLogin() {

  const [staffUsername, setStaffUsername] = useState('');
  const [staffPassword, setStaffPassword] = useState('');
  const [agentUsername, setAgentUsername] = useState('');
  const [agentPassword, setAgentPassword] = useState('');

  function sendRequest(path, data) {
    try {
      const url = 'http://localhost:5041/api' + path;
      return axios.post(url, data);
    } catch (error) {
      console.error('Error logging to account:', error);
    }
  }

  async function onSubmitBackoffice(e) {
    e.preventDefault();
  
    try {
      // Send the request and await the response
      const response = await sendRequest('/Staff/login', {
        Id: staffUsername,
        Password: staffPassword,
      });
  
      // Check if the response indicates success
      if (response && response.status === 200) {
        console.log('Login successful');
        // Store the session token in localStorage 
        //localStorage.setItem('sessionToken', response.data.sessionToken);
        // add the data field of the response to the local storage
        localStorage.setItem('sessionData', JSON.stringify(response.data.data));
        localStorage.setItem('userType', "backendOfficeStaff");

        // Redirect to the back office page
        window.location.href = "/backofficehome";
      } else {
        // Handle unsuccessful login, show an error message, or perform other actions
        console.error('Login failed:', response);
      }
    } catch (error) {
      // Handle errors that occur during the request
      console.error('Error during login:', error);
    }
  }
  

  async function onSubmitTravelAgent(e) {
    e.preventDefault();
  
    try {
      // Send the request and await the response
      const response = await sendRequest('/TravelAgent/login', {
        UserName: agentUsername,
        HashedPassword: agentPassword,
      });
  
      // Check if the response indicates success 
      if (response && response.status === 200) {
        console.log('Login successful');
        // Store the session token in localStorage 
        localStorage.setItem('sessionToken', response.data.sessionToken);
        localStorage.setItem('userType', "travelAgent");
        // Redirect to the travel agent page
        window.location.href = "/travelagenthome";
      } else {
        // Handle unsuccessful login, show an error message
        console.error('Login failed:', response);
      }
    } catch (error) {
      // Handle errors that occur during the request 
      console.error('Error during login:', error);
    }
  }
    
  return (
    <div className="login-panel-bg">
        <div className="login-panel">
      <div className="login-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" width={200} height={100} />
        </div>

        <h4>Employee Login</h4>
        <div className="login-form">
        
          <div className="section">
            <h4>Backoffice</h4>
            <div className="divider"></div>
            <div className="input-group">
              <label htmlFor="backoffice-username">Employee ID</label>
              <input 
                type="text" 
                id="backoffice-username"
                value={staffUsername}
                onChange={(e) => setStaffUsername(e.target.value)}/>
            </div>
            <div className="input-group">
              <label htmlFor="backoffice-password">Password</label>
              <input 
                type="password" 
                id="backoffice-password" 
                value={staffPassword}
                onChange={(e) => setStaffPassword(e.target.value)}/>
            </div>
            <p />
            <button className="login-button" onClick={onSubmitBackoffice}>Login</button>
          </div>
          <div className="divider-vertical"></div>
          <div className="section">
            <h4>Travel Agent</h4>
            <div className="divider"></div>
            <div className="input-group">
              <label htmlFor="agent-username">Registration Number</label>
              <input 
                type="text" 
                id="agent-username" 
                value={agentUsername}
                onChange={(e) => setAgentUsername(e.target.value)}/>
            </div>
            <div className="input-group">
              <label htmlFor="agent-password">Password</label>
              <input 
                type="password" 
                id="agent-password" 
                value={agentPassword}
                onChange={(e) => setAgentPassword(e.target.value)}/>
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
