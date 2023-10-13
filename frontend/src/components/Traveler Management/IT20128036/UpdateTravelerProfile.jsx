/**
 * File: UpdateTravelerProfile.jsx
 * Author: IT20128036
 * Description: This component is responsible for updating traveler profiles by backend office staff.
 * It displays a form with the current traveler profile data.
 * The form data is updated when the user makes changes.
 * When the user submits the form, the updated data is sent to the backend using a PUT request.
 * The user is then redirected to the viewtravelerprofile page.
  
 */

import React, { useState, useEffect } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Backoffice from "../../Navbar/Backoffice";
import "./contactUs.css";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function UpdateTravelerProfile() {
  const navigate = useNavigate();
  const { NIC } = useParams();

  // Form data state
  const [formData, setFormData] = useState({
    nic: "",
    fullName: "",
    dob: "",
    gender: "",
    contact: "",
    email: "",
    address: "",
    username: "",
    travelerType: "",
    accountStatus: "",
  });

  useEffect(() => {
    // Fetch the traveler's data using the provided NIC
    fetch(`http://localhost:5041/api/traveler/nic/${NIC}`)
      .then((response) => response.json())
      .then((data) => {
        setFormData(data); // Update the form data with fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [NIC]);

  // Handle form data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    // Send the updated data to the backend using a PUT request
    fetch(`http://localhost:5041/api/traveler/nics/${NIC}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Traveler profile updated successfully");
          // alert("Traveler profile updated successfully");
          // Replace the alert statement with a Swal success message
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Traveler profile updated successfully",
          });
          // Navigate to the viewtravelerprofile/id page
          navigate(`/viewtravelerprofile/${NIC}`);

          //   history.push(`/viewtravelerprofile/${id}`);
        } else {
          console.error("Failed to update traveler profile");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="inq_container" style={{ minHeight: "100vh" }}>
      <Backoffice />
      <Container>
        <div className="col-sm-12 mt-4">
          <div className="bg-white p-4 rounded shadow">
            <h1 className="text-center mt-4">
              {" "}
              <i class="fa fa-user-circle"></i>&nbsp;&nbsp;Update Traveler
              Profile
            </h1>

            <hr></hr>

            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group controlId="nic" className="mt-4">
                    <Form.Label>NIC</Form.Label>
                    <Form.Control
                      type="text"
                      name="nic"
                      value={formData.nic}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="fullName" className="mt-4">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="dob" className="mt-4">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="gender" className="mt-4">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      type="text"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="contact" className="mt-4">
                    <Form.Label>Contact</Form.Label>
                    <Form.Control
                      type="text"
                      name="contact"
                      value={formData.contact}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="email" className="mt-4">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="address" className="mt-4">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                />
              </Form.Group>
              <Row>
                <Col>
                  <Form.Group controlId="username" className="mt-4">
                    <Form.Label>Username</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="travelerType" className="mt-4">
                    <Form.Label>Traveler Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="travelerType"
                      value={formData.travelerType}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="accountStatus" className="mt-4">
                <Form.Label>Account Status</Form.Label>
                <Form.Control
                  type="text"
                  name="accountStatus"
                  value={formData.accountStatus}
                  onChange={handleChange}
                  disabled
                />
              </Form.Group>

              <Row>
                <Col sm={3}>
                  <Button variant="primary" type="submit" className="mt-4">
                    Update Profile
                  </Button>
                </Col>

                <Col>
                  <Link
                    to={`/viewtravelerprofile/${NIC}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Button variant="dark" type="submit" className="mt-4">
                      Back
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default UpdateTravelerProfile;
