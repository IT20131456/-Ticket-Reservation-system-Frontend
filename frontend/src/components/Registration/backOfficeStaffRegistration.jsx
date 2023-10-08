import React, { useState } from 'react';
import axios from 'axios'; 
import logo from "../../images/logo.png";
import BackOfficeNavBar from "../Navbar/Backoffice";

function BackOfficeStaffRegistration() {
    const [empId, setEmpId] = useState('');
    const [nic, setNic] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to backend API
            const response = await axios.post('http://localhost:5041/api/Staff', {
                StaffId: empId,
                NIC: nic,
                Name: name,
                Email: email,
                MobileNumber: mobile,
                UserName: username,
                HashedPassword: password,
            });

            // TODO: Handle the response, e.g., redirect or show a success message
            console.log('Account created successfully', response.data);

            // Redirect to the back office page
            window.location.href = "/backoffice";
        } catch (error) {
            // TODO: Handle errors, e.g., show an error message
            console.error('Error creating account:', error);
        }
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
                                <form onSubmit={onSubmitForm}>
                                    <div className="input-group">
                                        <label htmlFor="back-office-emp-id">Employee ID</label>
                                        <input
                                            type="text"
                                            id="back-office-emp-id"
                                            value={empId}
                                            onChange={(e) => setEmpId(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="back-office-nic">NIC</label>
                                        <input
                                            type="text"
                                            id="back-office-nic"
                                            value={nic}
                                            onChange={(e) => setNic(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="back-office-name">Name</label>
                                        <input
                                            type="text"
                                            id="back-office-name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="back-office-email">Email</label>
                                        <input
                                            type="email"
                                            id="back-office-email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="back-office-mobile">Mobile Number</label>
                                        <input
                                            type="text"
                                            id="back-office-mobile"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="back-office-username">Username</label>
                                        <input
                                            type="text"
                                            id="back-office-username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                        />
                                    </div>
                                    <div className="input-group">
                                        <label htmlFor="back-office-password">Password</label>
                                        <input
                                            type="password"
                                            id="back-office-password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <p />
                                    <button className="login-button" type="submit">
                                        Create Account
                                    </button>
                                </form>
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

export default BackOfficeStaffRegistration;
