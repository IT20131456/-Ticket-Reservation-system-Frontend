/**
 * File: TravelerProfile.jsx
 * Author: IT20128036
 * Description: This component is responsible for displaying a single traveler profile to backend office staff.
 * It displays the traveler's details and booking details.
 * The account status can be toggled between active and inactive.
 * The traveler can be deleted.
 * The traveler can be updated.
 
 */

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Row, Col, Form } from "react-bootstrap";
import "./userprofile.css";
import "./contactUs.css";
import Backoffice from "../../Navbar/Backoffice";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function ViewTravelerProfile() {
  // Use the useParams hook to get the ID from the URL
  const { NIC } = useParams();
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [id, setId] = useState("");

  const [nic, setNIC] = useState("");

  const [FullName, setFullName] = useState("");
  const [DOB, setDOB] = useState("");
  const [gender, setGender] = useState("");
  const [Contact, setContact] = useState("");
  const [Email, setEmail] = useState("");
  const [Address, setAddress] = useState("");
  const [Username, setUsername] = useState("update your website");
  const [TravelerType, setTravelerType] = useState("update company size");
  const [AccountStatus, setAccountStatus] = useState("update founded");

  const [valid, setValid] = useState(false);

  const [isAccountActive, setIsAccountActive] = useState(true);

  const handleAccountStatusChange = () => {
    // Check if there are bookings available
    if (bookings.length > 0 && isAccountActive) {
      // alert("You cannot deactivate your account with bookings.");
      Swal.fire({
        icon: "error",
        title: "Cannot Deactivate Account",
        text: "You cannot deactivate your account with bookings.",
      });
      return; // Prevent further execution of the function
    }
    // Toggle the account status state
    setIsAccountActive(!isAccountActive);

    // Convert the state to the string format expected by the API
    const newAccountStatus = isAccountActive ? "Inactive" : "Active";

    // Send a PUT request to update the account status in the API
    fetch(`http://localhost:5041/api/traveler/nics/${NIC}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        nic: nic,
        fullName: FullName,
        dob: DOB,
        gender: gender,
        contact: Contact,
        email: Email,
        address: Address,
        username: Username,
        travelerType: TravelerType,
        accountStatus: newAccountStatus,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // console.log('Account status updated successfully');
          // Show a success Swal message for the "Account status updated successfully" message
          Swal.fire({
            icon: "success",
            title: "Success",
            text: "Account status updated successfully",
          });
        } else {
          console.error("Failed to update account status");
        }
      })
      .catch((error) => {
        console.error("Error updating account status:", error);
      });
  };

  useEffect(() => {
    // Fetch user data from the API
    fetch(`http://localhost:5041/api/traveler/nic/${NIC}`)
      .then((response) => response.json())
      .then((data) => {
        // Set the state values with the data from the API response
        setId(data.id);
        setNIC(data.nic);
        setFullName(data.fullName);
        setDOB(data.dob);
        setGender(data.gender);
        setContact(data.contact);
        setEmail(data.email);
        setAddress(data.address);
        setUsername(data.username);
        setTravelerType(data.travelerType);
        setAccountStatus(data.accountStatus);
        setIsAccountActive(data.accountStatus === "Active" ? true : false);
      })
      .catch((error) => console.error("Error:", error));
  }, []);

  useEffect(() => {
    // Fetch traveler booking when the component mounts
    fetch(`http://localhost:5041/api/TicketBooking/nic/${NIC}`)
      .then((response) => response.json())
      .then((data) => setBookings(data))
      .catch((error) => console.error("Error:", error));
  }, []); // The empty dependency array ensures this effect runs once when the component mounts

  function deleteTraveler(NIC) {
    // Check if there are bookings associated with the traveler
    if (bookings.length > 0) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "This traveler has bookings and cannot be deleted.",
      });
      return; // Prevent further execution of the function
    }
    Swal.fire({
      title: "Delete Traveler",
      text: "Are you sure you want to delete this traveler?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5041/api/traveler/nic/${NIC}`, {
          method: "DELETE",
        })
          .then((response) => {
            if (response.ok) {
              // Show a success Swal message
              Swal.fire({
                icon: "success",
                title: "Success",
                text: "Traveler deleted successfully",
              });

              navigate("/travelerprofiles");
            } else {
              // Show an error Swal message
              Swal.fire({
                icon: "error",
                title: "Error",
                text: "Failed to delete traveler",
              });
            }
          })
          .catch((error) => {
            console.error("Error:", error);
            // Show an error Swal message
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "An error occurred while deleting the traveler",
            });
          });
      }
    });
  }

  return (
    <div className="inq_container" style={{ minHeight: "100vh" }}>
      <Backoffice />
      <div className="">
        <div className="container">
          <div className="col-sm-12 bg-white border border-light rounded shadow mt-4 ">
            <div className="row">
              <div className="col-sm-4">
                <div>
                  <div className="p-3 mb-4 mt-4 my-4 mx-4 text-dark slidebar">
                    {valid ? (
                      <div>
                        <h1>
                          <img
                            className="img shadow-lg"
                            src={require(`../../../images/user1.png`)}
                            alt="alt"
                          />
                        </h1>
                      </div>
                    ) : (
                      <div>
                        <h6>
                          <img
                            className="img"
                            src={require(`../../../images/user1.png`)}
                            alt="alt"
                          />
                        </h6>
                      </div>
                    )}
                    <div className="text-center">
                      {/* <a
                        href="/userprofile/update/photo"
                        className="btn btn-outline-light "
                      >
                        Update Photo
                      </a> */}
                    </div>
                    <hr />

                    <div>
                      <a href="/admin/userroles">
                        <div
                          className="p-2 mb-2 text-white"
                          style={{
                            background: "#FFFFFF",
                            textDecoration: "none",
                          }}
                        >
                          <a className="btn text-dark">
                            <i class="fa fa-user" aria-hidden="true"></i>
                            &nbsp;&nbsp;{FullName}
                          </a>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="">
                        <div
                          className="p-2 mb-2 text-white"
                          style={{
                            background: "#FFFFFF",
                            textDecoration: "none",
                          }}
                        >
                          <a className="btn text-dark">
                            <i class="fa fa-envelope" aria-hidden="true"></i>
                            &nbsp;&nbsp;{Email}
                          </a>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="">
                        <div
                          className="p-2 mb-2 text-white"
                          style={{
                            background: "#FFFFFF",
                            textDecoration: "none",
                          }}
                        >
                          <a className="btn text-dark">
                            <i class="fa fa-mobile" aria-hidden="true"></i>
                            &nbsp;&nbsp;{Contact}
                          </a>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="#">
                        <div
                          className="p-2 mb-2 text-white"
                          style={{
                            background: "#FFFFFF",
                            textDecoration: "none",
                          }}
                        >
                          <a className="btn text-dark">
                            <i
                              class="fa fa-address-card"
                              aria-hidden="true"
                            ></i>
                            &nbsp;&nbsp;Address<br></br>
                          </a>
                        </div>
                      </a>
                    </div>

                    <div>
                      <a href="">
                        <div
                          className="p-2 mb-2 text-white"
                          style={{
                            background: "#FFFFFF",
                            textDecoration: "none",
                          }}
                        >
                          <a className="btn text-dark">
                            <i aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                            {Address}
                          </a>
                        </div>
                      </a>
                    </div>

                    <div></div>

                    {/* <div className="p-3 mb-2 bg-light text-dark">
                      <a
                        href="/user/change/password"
                        style={{ textDecoration: "none" }}
                      >
                        <p className="h6">
                          <i class="fa fa-key" aria-hidden="true"></i>
                          &nbsp;&nbsp;change password
                        </p>
                      </a>
                      <div></div>
                    </div> */}
                  </div>
                </div>
              </div>

              <div className="col-sm-8">
                <div className="mt-4 mb-4 mx-4 my-4">
                  {/* <h5>
                    <strong>National Identity Card (NIC)</strong>
                  </h5>
                  <p1>{nic}</p1> */}

                  {/* <h2>Traveler Profile</h2> */}
                  <h2 style={{ textAlign: "center" }}>
                    {" "}
                    <i class="fa fa-user-circle"></i>&nbsp;&nbsp;Traveler
                    Profile
                  </h2>
                  <hr></hr>

                  <div className="row">
                    <div className="col-sm-4 mt-4">
                      <h5>
                        <strong>User Name</strong>
                      </h5>
                      <p>{FullName}</p>
                    </div>
                    <div className="col-sm-6 mt-4">
                      <h5>
                        <strong>National Identity Card (NIC)</strong>
                      </h5>
                      <p>{nic}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-4 mt-4">
                      <h5>
                        <strong>Traveler Type</strong>
                      </h5>
                      <p>{TravelerType}</p>
                    </div>
                    <div className="col-sm-4 mt-4">
                      <h5>
                        <strong>Gender</strong>
                      </h5>
                      <p>{gender}</p>
                    </div>

                    <div className="col-sm-4 mt-4">
                      <h5>
                        <strong>Date Of Birth</strong>
                      </h5>
                      <p>{DOB}</p>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-sm-10 mt-5">
                      <h5>
                        <strong>Booking Details</strong>
                      </h5>

                      {/* <table class="table table-sm">
                        <thead>
                          <tr>
                            <th scope="col">#</th>
                            <th scope="col">Train</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <th scope="row">1</th>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                          </tr>
                          <tr>
                            <th scope="row">2</th>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                          </tr>
                          <tr>
                            <th scope="row">3</th>
                            <td colspan="2">Larry the Bird</td>
                            <td>@twitter</td>
                          </tr>
                        </tbody>
                      </table> */}
                      <hr></hr>
                      {bookings.length > 0 ? (
                        <table className="table table-sm">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Train</th>
                              <th scope="col">From</th>
                              <th scope="col">To</th>
                              <th scope="col">Class</th>
                              <th scope="col">Price</th>
                              <th scope="col">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {bookings.map((booking, index) => (
                              <tr key={booking.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{booking.train_name}</td>
                                <td>{booking.from}</td>
                                <td>{booking.to}</td>
                                <td>{booking.ticket_class}</td>
                                <td>{booking.total_price}</td>
                                <td>{booking.reservation_date}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        // <p>No bookings available.</p>
                        <p className="alert alert-info">
                          No bookings available.
                        </p>
                      )}
                    </div>
                  </div>

                  <Row>
                    <Col>
                      <div className="col-sm-3 mt-5">
                        <Link
                          to={`/updatetravelerprofile/${NIC}`}
                          style={{ textDecoration: "none" }}
                        >
                          <a className="btn btn-primary">
                            <i class="fa fa-pencil-square-o" aria-hidden="true">
                              Edit
                            </i>{" "}
                          </a>
                        </Link>
                      </div>
                    </Col>

                    <Col>
                      <div className="col-sm-12 mt-5">
                        {/* <button type="button" class="btn btn-danger" onclick="deleteTraveler('${id}')">Delete</button>         */}
                        {/* <button type="button" class="btn btn-danger" onclick={deleteTraveler(`${id}`)}>
  <i class="fa fa-trash" aria-hidden="true"> </i>Delete
</button> */}
                        <button
                          type="button"
                          className="btn btn-danger"
                          onClick={() => deleteTraveler(NIC)}
                        >
                          <i className="fa fa-trash" aria-hidden="true">
                            Delete
                          </i>
                        </button>
                      </div>
                    </Col>

                    <Col>
                      <div className="col-sm-12 mt-5">
                        <Form.Check
                          type="switch"
                          id="account-switch"
                          // label={`Account Status: ${isAccountActive ? 'Active' : 'Inactive'}`}
                          checked={isAccountActive}
                          onChange={handleAccountStatusChange}
                        />

                        {isAccountActive ? (
                          <p className="text-success">Account is active</p>
                        ) : (
                          <p className="text-danger">Account is inactive</p>
                        )}
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
