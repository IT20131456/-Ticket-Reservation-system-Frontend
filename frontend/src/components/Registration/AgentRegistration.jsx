/**
 * File: AgentRegistration.jsx
 * Author: IT20125202
 * Description: This component is responsible for registering new travel agent accounts.
 */

import React, { useState } from 'react';
import axios from 'axios';
import LandningPageNav from '../Navbar/LandningPageNav';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import swal from 'sweetalert';
import logo from "../../images/logo.png";
import './style.css';
import { validateAgentForm } from './ValidationUtils';

function TravelAgentRegistration() {

    // State variables for form fields and errors
    const [regNo, setRegNo] = useState('');
    const [nic, setNic] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    // Handle form submission
    const onSubmitForm = async (e) => {
        e.preventDefault();

        const formData = { regNo, nic, name, email, mobile, username, password };
        const validationErrors = validateAgentForm(formData);

        // Check if there are no validation errors
        if (Object.keys(validationErrors).length === 0) {
            try {
                // Make a POST request to create a travel agent account
                const response = await axios.post('http://localhost:5041/api/TravelAgent', {
                    RegNo: regNo,
                    NIC: nic,
                    Name: name,
                    Email: email,
                    MobileNumber: mobile,
                    UserName: username,
                    HashedPassword: password,
                });

                // Show a success message and redirect when user clicks OK
                swal({
                    title: "Success!",
                    text: "Travel agent account created successfully!",
                    icon: "success",
                    button: "OK",
                }).then(() => {
                    window.location.href = "/employee/login";
                });

            } catch (error) {
                // show an error message
                console.error('Error creating account:', error);
                swal({
                    title: "Error!",
                    text: "Error creating account!",
                    icon: "error",
                    button: "OK",
                });
            }
        } else {
            // Validation failed, set the errors
            setErrors(validationErrors);
        }
    };

    return (
        <div className='reg-panel-bg'>
            <LandningPageNav />
            <div className="custom-container-bg-white">
                <div className="logo-container">
                    <img src={logo} alt="Logo" width={200} height={100} />
                </div>
                <Form className='custom-form'>
                    <h4 style={{ textAlign: 'center', color: '#191970', paddingBottom: '60px' }}>Travel Agent Registration</h4>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Registration No.
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" value={regNo} onChange={(e) => setRegNo(e.target.value)} placeholder="Registration Number (Ex. AG001)" />
                            {errors.regNo &&
                                <Alert key='danger' variant='danger'>
                                    {errors.regNo}
                                </Alert>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            NIC
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" value={nic} onChange={(e) => setNic(e.target.value)} placeholder="NIC Number (Ex. 123456789v or 199012345678)"/>
                            {errors.nic &&
                                <Alert key='danger' variant='danger'>
                                    {errors.nic}
                                </Alert>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Name
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" />
                            {errors.name &&
                                <Alert key='danger' variant='danger'>
                                    {errors.name}
                                </Alert>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Email
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                            {errors.email &&
                                <Alert key='danger' variant='danger'>
                                    {errors.email}
                                </Alert>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Mobile Number
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number (Ex. 0771234567 or +94771234567)"/>
                            {errors.mobile &&
                                <Alert key='danger' variant='danger'>
                                    {errors.mobile}
                                </Alert>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Username
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username"/>
                            {errors.username &&
                                <Alert key='danger' variant='danger'>
                                    {errors.username}
                                </Alert>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            Password
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                            {errors.password &&
                                <Alert key='danger' variant='danger'>
                                    {errors.password}
                                </Alert>}
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} className="mb-3 justify-content-center">
                        <Button type="button" onClick={onSubmitForm} className="custom-button">Register</Button>
                    </Form.Group>
                </Form>
            </div>
        </div>
    );
}

export default TravelAgentRegistration