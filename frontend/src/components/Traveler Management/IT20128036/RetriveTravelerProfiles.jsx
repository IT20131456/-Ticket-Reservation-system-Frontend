/**
 * File: RetriveTravelerProfiles.jsx
 * Author: IT20128036
 * Description: This component is responsible for displaying traveler profiles to backend office staff.
  * It displays a list of all traveler profiles.
 */

import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import img1 from "../../../images/user.jpg";
import Backoffice from "../../Navbar/Backoffice";
import { Link } from "react-router-dom";
import "./contactUs.css";

function TravelerProfiles() {
  const [travelers, setTravelers] = useState([]);

  useEffect(() => {
    // Fetch traveler profiles when the component mounts
    fetch("http://localhost:5041/api/Traveler")
      .then((response) => response.json())
      .then((data) => setTravelers(data))
      .catch((error) => console.error("Error:", error));
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  // Slider settings
  const sliderSettings = {
    infinite: true,
    slidesToShow: 2, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    variableWidth: true, // Allows each slide to have variable width
  };

  return (
    <div className="inq_container" style={{ minHeight: "100vh" }}>
      <Backoffice />
      <div className="container mt-5">
        <h1 className="text-center mb-4">
          {" "}
          <i class="fa fa-user-circle"></i>&nbsp;&nbsp;Traveler Profiles
        </h1>
        <div className="row">
          {travelers.map((traveler) => (
            <div key={traveler.Id} className="col-md-6 mb-3">
              <div className="list-group">
                <Link
                  to={`/viewtravelerprofile/${traveler.nic}`}
                  style={{ textDecoration: "none" }}
                >
                  <li className="list-group-item" variant="danger">
                    <Row>
                      <Col sm={2}>
                        <img
                          src={img1}
                          alt={`Profile of ${traveler.fullName}`}
                          className="img-thumbnail rounded-circle mb-2"
                          width="100"
                          height="100"
                        />
                      </Col>

                      <Col sm={7}>
                        <Row>
                          <Col sm={3}>
                            <h5 className="mb-2">
                              <strong>Name:</strong>
                            </h5>
                            <p className="mb-2">
                              <strong>NIC:</strong>
                            </p>
                            <p>
                              <strong>Email:</strong>
                            </p>
                          </Col>

                          <Col>
                            <h5 className="mb-2">{traveler.fullName}</h5>
                            <p className="mb-2">{traveler.nic}</p>
                            <p>{traveler.email}</p>
                          </Col>
                        </Row>
                      </Col>

                      <Col className="d-flex justify-content-center align-items-center">
                        {/* <Button variant="success">{traveler.accountStatus}</Button> */}

                        {traveler.accountStatus === "Active" ? (
                          <Button variant="primary" className="ms-2">
                            Active
                          </Button>
                        ) : (
                          <Button variant="danger" className="ms-2">
                            Not Active
                          </Button>
                        )}
                      </Col>
                    </Row>
                  </li>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TravelerProfiles;
