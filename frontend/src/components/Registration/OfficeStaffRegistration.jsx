/**
 * File: OfficeStaffRegistration.jsx
 * Author: IT20125202
 * Description: This component is responsible for registering new staff accounts.
 * It is only accessible to users with admin permissions.
 */

import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import BackOfficeNavBar from "../Navbar/Backoffice";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import logo from "../../images/logo.png";
import './style.css';
import { validateStaffForm } from './ValidationUtils';

function BackOfficeStaffRegistration() {

    // State variables for form fields and validation errors
    const [empId, setEmpId] = useState('');
    const [nic, setNic] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [errors, setErrors] = useState({});

    // Handler for form submission
    const onSubmitForm = async (e) => {
        e.preventDefault();

        // Create an object with form data for validation
        const formData = { empId, nic, name, email, mobile, username, password };

        // Validate form data and get validation errors
        const validationErrors = validateStaffForm(formData);

        // Check if there are no validation errors
        if (Object.keys(validationErrors).length === 0) {

            // Create a new staff member object
            const newStaff = {
                StaffId: empId,
                NIC: nic,
                Name: name,
                Email: email,
                MobileNumber: mobile,
                UserName: username,
                HashedPassword: password,
                IsAdmin: isAdmin
            };
            console.log(newStaff);

            try {
                // Make a POST request to create a new staff account
                const response = await axios.post('http://localhost:5041/api/Staff', newStaff);

                // Handle success, show an alert, and redirect
                console.log('Account created successfully', response.data);
                swal({
                    title: "Success!",
                    text: "Staff account created successfully!",
                    icon: "success",
                    button: "OK",
                }).then(() => {
                    window.location.href = "/usermanagement";
                });
            } catch (error) {
                // Handle errors, show an alert
                console.error('Error creating account:', error);
                swal({
                    title: "Error!",
                    text: "Error creating staff account!",
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
            <BackOfficeNavBar />
            <div className="custom-container-bg-white">
                <div className="logo-container">
                    <img src={logo} alt="Logo" width={200} height={100} />
                </div>
                <Form className='custom-form'>
                    <h4 style={{ textAlign: 'center', color: '#191970', paddingBottom: '60px' }}>Staff Account Registration</h4>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                        <Form.Label column sm={2}>
                            Staff ID
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} placeholder="Staff ID Number (Ex. 001)" />
                            {errors.empId &&
                                <Alert key='danger' variant='danger'>
                                    {errors.empId}
                                </Alert>}
                        </Col>
                    </Form.Group>
                    <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                            NIC
                        </Form.Label>
                        <Col sm={10}>
                            <Form.Control type="text" value={nic} onChange={(e) => setNic(e.target.value)} placeholder="NIC Number (Ex. 123456789v or 199012345678)" />
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
                            <Form.Control type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} placeholder="Mobile Number (Ex. 0771234567 or +94771234567)" />
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
                            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
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
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check type="checkbox" label="Admin" checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)} />
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

export default BackOfficeStaffRegistration;
