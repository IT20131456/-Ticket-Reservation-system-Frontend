import "bootstrap/dist/css/bootstrap.min.css";

import React, { useState } from "react";
import { Link } from "react-router-dom";

import styles from "./register.module.css";

import Backoffice from "../../Navbar/Backoffice";
import Swal from "sweetalert2";
import { Row, Col } from "react-bootstrap";
import "./slidebar.css";

function TravelerManagement() {
  const [travelers, setTravelers] = useState([]);
  const [newTraveler, setNewTraveler] = useState({
    NIC: "",
    name: "",
    isActive: true,
  });

  // Function to create a new traveler profile
  const createTraveler = () => {
    // Validate and add the new traveler to the list
    if (newTraveler.NIC && newTraveler.name) {
      setTravelers([...travelers, newTraveler]);
      setNewTraveler({ NIC: "", name: "", isActive: true });
    }
  };

  // Function to update a traveler's profile
  const updateTraveler = (updatedTraveler) => {
    // Find the traveler by NIC and update their information
    const updatedTravelers = travelers.map((traveler) =>
      traveler.NIC === updatedTraveler.NIC ? updatedTraveler : traveler
    );
    setTravelers(updatedTravelers);
  };

  // Function to delete a traveler's profile
  const deleteTraveler = (NIC) => {
    // Filter out the traveler with the given NIC
    const updatedTravelers = travelers.filter(
      (traveler) => traveler.NIC !== NIC
    );
    setTravelers(updatedTravelers);
  };

  // Function to toggle activation status
  const toggleActivation = (NIC) => {
    // Find the traveler by NIC and toggle their isActive status
    const updatedTravelers = travelers.map((traveler) =>
      traveler.NIC === NIC
        ? { ...traveler, isActive: !traveler.isActive }
        : traveler
    );
    setTravelers(updatedTravelers);
  };

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    field: "not selected yet",
    address: "",
    type: "not selected yet",
    password: "",
    nic: "",
    status: "Not Active",
    dob: "not set yet",
    gender: "not set yet",
  });

  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const nicPattern = /^[0-9]{9}[Vv]$/;
    // const nicPattern = /^[0-9]{13}$/;

    // Validate form data here
    if (
      !formData.nic ||
      !formData.name ||
      !formData.mobile ||
      !formData.email ||
      !formData.address ||
      !formData.type ||
      !formData.password
    ) {
      // Show a Swal error message for missing fields
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    } else if (!emailPattern.test(formData.email)) {
      // Show a Swal error message for invalid email format
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter a valid email address.",
      });
      return;
    } else if (formData.mobile.length !== 10) {
      // Show a Swal error message for invalid mobile number
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter a valid mobile number.",
      });
      return;
    } else if (!nicPattern.test(formData.nic)) {
      // Show a Swal error message for invalid NIC
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Please enter a valid NIC in the format XXXXXXXXXV.",
      });
      return;
    } else if (formData.password.length < 8) {
      // Show a Swal error message for invalid password
      Swal.fire({
        icon: "error",
        title: "Validation Error",
        text: "Password must be at least 8 characters long.",
      });
      return;
    }

    // Create an object with the desired structure
    const requestBody = {
      Id: "",
      NIC: formData.nic,
      FullName: formData.name,
      Contact: formData.mobile,
      Email: formData.email,
      Address: formData.address,
      TravelerType: formData.type,
      PasswordHash: formData.password,
      AccountStatus: formData.status,
      DOB: formData.dob,
      Gender: formData.gender,
    };

    try {
      // Make an HTTP POST request to your ASP.NET REST API
      const response = await fetch("http://localhost:5041/api/Traveler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody), // Convert the object to JSON
      });

      if (response.ok) {
        // Request was successful, handle the response

        const data = await response.json();
        console.log("Response data:", data);
        if (data) {
          // alert('Traveler Registered Successfully');
          // Show a success Swal message
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Traveler Registered Successfully",
          });
        }

        // Clear the form fields by resetting the formData state
        setFormData({
          nic: "",
          name: "",
          mobile: "",
          email: "",
          address: "",
          type: "",
          password: "",
        });
      } else {
        // Request failed, handle the error
        console.error("Request failed:", response.statusText);
        // alert("Request failed:", response.statusText);
        Swal.fire({
          icon: "error",
          title: "Request Failed",
          text: response.statusText,
        });
      }
    } catch (error) {
      // Handle any network or other errors
      console.error("Error:", error.message);
      alert("Error:", error.message);
    }
  };

  return (
    <div>
      <Backoffice />

      <div className={styles.signup_container}>
        <Row>
          <Col>
            <div className="sidebar">
              <div className="sidebar-header">Traveler Management</div>
              <div className="sidebar-buttons">
                <Link to="/traveler">
                  <button className="sidebar-button">Register Traveler</button>
                </Link>
                <Link to="/travelerprofiles">
                  <button className="sidebar-button">Manage Travelers </button>
                </Link>
                <Link to="/travelerprofiles">
                  <button className="sidebar-button">Search Travelers</button>
                </Link>
              </div>
            </div>
          </Col>

          <Col>
            <div className={styles.signup_form_container}>
              <div className={styles.left}>
                <h5>Manage Travelers</h5>
                <Link to="/travelerprofiles">
                  <button type="button" className={styles.white_btn}>
                    Travelers
                  </button>
                </Link>
              </div>
              <div className={styles.right}>
                <form className={styles.form_container}>
                  <h3>
                    <strong>
                      {" "}
                      <i class="fa fa-user-circle"></i>&nbsp;&nbsp;Register
                      Traveler
                    </strong>
                  </h3>

                  <input
                    type="text"
                    placeholder="Full Name"
                    name="name"
                    onChange={onChange}
                    value={formData.name}
                    required
                    className="form-control mt-2 mb-2"
                  />

                  <input
                    type="email"
                    placeholder="Email Address"
                    name="email"
                    onChange={onChange}
                    value={formData.email}
                    required
                    className="form-control mt-2 mb-2"
                  />

                  <input
                    type="text"
                    placeholder="Mobile Number"
                    name="mobile"
                    onChange={onChange}
                    value={formData.mobile}
                    required
                    className="form-control mt-2 mb-2"
                  />

                  <select
                    className="form-select mt-2 mb-2"
                    name="type"
                    value={formData.type}
                    onChange={onChange}
                    required
                  >
                    <option fieldofinterest="not selected yet" selected>
                      Traveler Type
                    </option>
                    <option fieldofinterest="Regular Traveler">
                      Regular Traveler
                    </option>
                    <option fieldofinterest="Frequent Traveler">
                      Frequent Traveler
                    </option>
                    <option fieldofinterest="Business Traveler">
                      Business Traveler
                    </option>
                    <option fieldofinterest="Student Traveler">
                      Student Traveler
                    </option>
                  </select>

                  <textarea
                    placeholder="Address"
                    name="address"
                    onChange={onChange}
                    value={formData.address}
                    required
                    className="form-control mt-2 mb-2"
                  />

                  {/* <select
              className="form-select mt-2 mb-2"
              name="type"
              value={formData.type}
              onChange={onChange}
              required
            >
              <option type="not selected yet" selected>
                Type
              </option>
              <option type="Job Seeker">Job Seeker</option>
              <option type="Job Recruiter">Job Recruiter</option>
            </select> */}

                  <input
                    type="text"
                    placeholder="NIC"
                    name="nic"
                    onChange={onChange}
                    value={formData.nic}
                    required
                    className="form-control mt-2 mb-2"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={onChange}
                    value={formData.password}
                    required
                    className="form-control mt-2 mb-2"
                  />

                  <button
                    type="submit"
                    onClick={onSubmit}
                    className={styles.green_btn}
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default TravelerManagement;
