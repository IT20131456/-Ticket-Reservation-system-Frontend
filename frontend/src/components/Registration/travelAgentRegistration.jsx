// to handle travel agent registration - travel agents can create accounts
import React from 'react'
import logo from "../../images/logo.png";
import BackOfficeNavBar from "../Navbar/Backoffice";

function travelAgentRegistration() {

    function onSubmitForm(e) {
        e.preventDefault()
        window.location.href = "/employee/login";
    };

    return (
        <div>
            <BackOfficeNavBar />
            <div className="login-panel-bg">
                <div className="login-panel">
                    <div className="login-container">
                        <div className="logo-container">
                            <img src={logo} alt="Logo" width={200} height={100} />
                        </div>
                        <div className="login-form">

                            <div className="section">
                                <h4>Staff Account Creation</h4>
                                <div className="divider"></div>
                                <div className="input-group">
                                    <label htmlFor="backoffice-nic">NIC</label>
                                    <input type="text" id="backoffice-nic" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="backoffice-regno">Registration Number</label>
                                    <input type="text" id="backoffice-regno" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="backoffice-email">Email Address</label>
                                    <input type="text" id="backoffice-email" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="backoffice-phone">Contact Number</label>
                                    <input type="text" id="backoffice-phone" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="backoffice-username">Username</label>
                                    <input type="text" id="backoffice-username" />
                                </div>
                                <div className="input-group">
                                    <label htmlFor="backoffice-password">Password</label>
                                    <input type="password" id="backoffice-password" />
                                </div>
                                <p />
                                <button className="login-button" onClick={onSubmitForm}>Create Account</button>
                            </div>
                        </div>
                        <p />
                        <p />
                        <p />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default travelAgentRegistration