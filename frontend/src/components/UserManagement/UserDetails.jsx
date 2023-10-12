/**
 * File: UserDetails.jsx
 * Author: IT20125202
 * Description: This file contains the UserDetails component, which displays details for different user types.
 * This component is rendered when the user clicks the "More Details" button in the AllUserView component.
 * Backend office staff can activate or deactivate traveler accounts from this component.
 */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Backoffice from '../Navbar/Backoffice';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import swal from "sweetalert";

function UserDetails() {

    // Use the useNavigate hook for routing
    const navigate = useNavigate();

    // Get the user ID and type from the URL
    const { id, type } = useParams();

    // State for user data and session data
    const [userData, setUserData] = useState({});
    const [sessionData, setSessionData] = useState({});
    const [userType, setUserType] = useState("");

    // State for traveler, staff, and agent data
    const [travelerData, setTravelerData] = useState({
        id: "",
        nic: "",
        fullName: "",
        dob: "",
        gender: "",
        contact: "",
        email: "",
        address: "",
        username: "",
        passwordHash: null,
        profile: null,
        travelerType: "",
        accountStatus: "",
        createdAt: null
    });
    const [staffData, setStaffData] = useState({
        staffId: "",
        nic: "",
        name: "",
        email: "",
        mobileNumber: "",
        userName: "",
        hashedPassword: null,
        isAdmin: false
    });
    const [agentData, setAgentData] = useState({
        regNo: "",
        nic: "",
        name: "",
        email: "",
        mobileNumber: "",
        userName: "",
        hashedPassword: null
    });

    // Fetch user session data and user data on component load
    useEffect(() => {
        getSessionData();

        if (userType === "backendOfficeStaff") {
            fetchUserData();
        }
    }, [id]);

    // Function to fetch user session data from localStorage
    async function getSessionData() {
        const storedSessionData = localStorage.getItem('sessionData');
        const storedUserTypePermissions = localStorage.getItem('userType');
        if (storedSessionData && storedUserTypePermissions) {
            const sessionData = JSON.parse(storedSessionData);
            const type = JSON.parse(storedUserTypePermissions);
            setSessionData(sessionData);
            setUserType(type);
        } else {
            // Handle the case where no session data is found in localStorage
            console.error('Session data not found');

            // Display an alert and redirect to the login page when user clicks OK
            swal({
                title: "Error!",
                text: "Please login to continue!",
                icon: "error",
                button: "OK",
            }).then(() => {
                window.location.href = "/employee/login";
            });
        }

        // Check if the user is a backend office staff member
        if (userType !== "backendOfficeStaff") {
            // display an alert and redirect to the login page when user clicks OK
            swal({
                title: "Error!",
                text: "You do not have permission to access this page!",
                icon: "error",
                button: "OK",
            }).then(() => {
                window.location.href = "/employee/login";
            });
        }
    }

    // Function to deactivate user account
    function deactivateAccount() {
        updateAccount("Inactive")
    }

    // Function to activate user account
    function activateAccount() {
        updateAccount("Active")
    }

    // Function to update user account status
    async function updateAccount(status) {
        try {
            // Get the user confirmation before updating the account status
            swal("Are you sure you want to update this user data?", {
                buttons: {
                    cancel: "Cancel",
                    catch: {
                        text: "Confirm",
                        value: "confirmed",
                    },
                },
            }).then((value) => {
                if (value === "confirmed") {
                    const updatedData = {
                        id: travelerData.id,
                        nic: travelerData.nic,
                        fullName: travelerData.fullName,
                        dob: travelerData.dob,
                        gender: travelerData.gender,
                        contact: travelerData.contact,
                        email: travelerData.email,
                        address: travelerData.address,
                        username: travelerData.username,
                        passwordHash: travelerData.passwordHash,
                        profile: travelerData.profile,
                        travelerType: travelerData.travelerType,
                        accountStatus: status,
                        createdAt: travelerData.createdAt
                    };

                    // Send PUT request
                    fetch(`http://localhost:5041/api/Traveler/nics/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(updatedData),
                    })
                        .then((response) => {

                            // Check if the response is ok 
                            if (response.ok) {
                                return response.text();
                            }
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        })
                        .then((message) => {

                            // Display an alert when the account status is updated successfully
                            swal("Success", message, "success");
                            fetchUserData()
                        })
                        .catch((error) => {

                            // Display an alert when an error occurs
                            console.error("PUT request error: ", error);
                            swal("Error", "Failed to update user data", "error");
                        });
                } else {

                    // Display an alert when the user clicks cancel
                    swal("Cancelled!");
                }
            });
        } catch (error) {

            // Display an alert when an error occurs
            console.error("Error: ", error);
            swal("Error", "Failed to update user data", "error");
        }
    }

    // Function to fetch user data based on type
    const fetchUserData = async () => {
        let url = "http://localhost:5041/api/";

        // Set the URL based on the user type
        switch (type) {
            case "staff":
                url = url + "Staff/";
                break;

            case "travelagent":
                url = url + "TravelAgent/";
                break;

            case "traveler":
                url = url + "Traveler/nic/";
                break;

            default:
                break;
        }

        try {

            // Fetch user data from the database
            const response = await fetch(url + `${id}`);
            if (response.ok) {
                const data = await response.json();

                // Set the user data based on the user type
                switch (type) {
                    case "staff":
                        setStaffData(data)
                        setUserData(data)
                        break;

                    case "travelagent":
                        setAgentData(data)
                        setUserData(data)
                        break;

                    case "traveler":
                        setTravelerData(data)
                        setUserData(data)
                        break;

                    default:
                        setUserData(data)
                        break;
                }
            }
        }
        catch (error) {

            // Display an alert when an error occurs
            console.error('Error fetching user data:', error);
            swal("Error", "Failed to fetch user data", "error");
        }
    }

    // Render different views based on the user type
    let userDetailsView;
    switch (type) {
        case "staff":
            userDetailsView = (
                <div>
                    <h2 style={{ textAlign: 'center', color: '#191970', paddingBottom: '40px' }}>Staff Details</h2>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Staff ID
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.staffId || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                NIC
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.nic || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Name
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.name || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Email
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="email" value={userData.email || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Mobile Number
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.mobileNumber || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Username
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.userName || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Form.Check label="Admin" checked={userData.isAdmin} readOnly />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="button" onClick={() => navigate(`/usermanagement`)}>Back to all accounts</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            );
            break;

        case "travelagent":
            userDetailsView = (
                <div>
                    <h2 style={{ textAlign: 'center', color: '#191970', paddingBottom: '40px' }}>Travel Agent Details</h2>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
                            <Form.Label column sm={2}>
                                Registration No.
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.regNo || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                NIC
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.nic || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Name
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.name || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Email
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="email" value={userData.email || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Mobile Number
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.mobileNumber || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Username
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.userName || ''} readOnly />
                            </Col>
                        </Form.Group>

                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                <Button type="button" onClick={() => navigate(`/usermanagement`)}>Back to all accounts</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            );
            break;

        case "traveler":
            userDetailsView = (
                <div>
                    <h2 style={{ textAlign: 'center', color: '#191970', paddingBottom: '40px' }}>Traveler Details</h2>
                    <Form>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                NIC
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.nic || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Full Name
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.fullName || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Date of Birth
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.dob || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Gender
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.gender || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Mobile Number
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.contact || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Email
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="email" value={userData.email || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Address
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.address || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Username
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.username || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Traveler Type
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.travelerType || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalPassword">
                            <Form.Label column sm={2}>
                                Account Status
                            </Form.Label>
                            <Col sm={10}>
                                <Form.Control type="text" value={userData.accountStatus || ''} readOnly />
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3">
                            <Col sm={{ span: 10, offset: 2 }}>
                                {travelerData.accountStatus === "Active" ? (
                                    <Button type="button" variant="outline-danger" onClick={deactivateAccount}>Deactivate</Button>
                                ) : (
                                    <Button type="button" variant="outline-success" onClick={activateAccount}>Activate</Button>
                                )
                                }
                                <br /><br />
                                <Button type="button" onClick={() => navigate(`/usermanagement`)}>Back to all accounts</Button>
                            </Col>
                        </Form.Group>
                    </Form>
                </div>
            );
            break;

        default:
            userDetailsView = (
                <div>
                    <p>Invalid user type: {type}</p>
                </div>
            );
            break;
    }

    return (
        <div className="body">
            <Backoffice />
            <div className="custom-container-bg-white">
                {userDetailsView}
            </div>
        </div>
    );
}

export default UserDetails