import React, { useState } from 'react';
import axios from 'axios';
import logo from "../../images/logo.png";
import BackOfficeNavBar from "../Navbar/Backoffice";
import './style.css'
import { validateStaffForm } from './ValidationUtils';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import swal from 'sweetalert';

// This component is for the registrations of the backend staff. 
function BackOfficeStaffRegistration() {
    const [empId, setEmpId] = useState('');
    const [nic, setNic] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [errors, setErrors] = useState({});

    const onSubmitForm = async (e) => {
        e.preventDefault();

        const formData = { empId, nic, name, email, mobile, username, password };
        const validationErrors = validateStaffForm(formData);

        if (Object.keys(validationErrors).length === 0) {

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
                // Make a POST request to backend API
                const response = await axios.post('http://localhost:5041/api/Staff', newStaff);

                // redirect or show a success message
                console.log('Account created successfully', response.data);
                // show an alert and redirect to the back office home page when user clicks OK
                swal({
                    title: "Success!",
                    text: "Staff account created successfully!",
                    icon: "success",
                    button: "OK",
                }).then(() => {
                    window.location.href = "/usermanagement";
                });
            } catch (error) {
                // Handle errors
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
                            <Form.Control type="text" value={empId} onChange={(e) => setEmpId(e.target.value)} />
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
                            <Form.Control type="text" value={nic} onChange={(e) => setNic(e.target.value)} />
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
                            <Form.Control type="text" value={name} onChange={(e) => setName(e.target.value)} />
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
                            <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                            <Form.Control type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} />
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
                            <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
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
                            <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
