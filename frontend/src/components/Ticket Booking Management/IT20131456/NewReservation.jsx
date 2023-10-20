/**
 * Filename: NewReservations.js
 * Author: IT20131456 
 * Description: React component for making new reservations in the Ticket Booking system.
 *              Allows travel agents to book tickets for travelers by entering necessary details.
 */
import React, { useState, useEffect } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrainSubway,
  faCoins,
  faCircleCheck,
  faPersonWalkingLuggage,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import TravelAgentNavBar from "../../Navbar/Travel Agent";
import {
  getCurrentDate,
  getFormattedDates,
} from "./Validations/DateValidations";
import { calculateTotalPrice } from "./Validations/TicketPriceValidation";
import axios from "axios";
import "./styles.css";
import swal from "sweetalert";

export default function NewReservations() {
  const [booking_details, setBookingDetails] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [isInputGroupDisabled, setIsInputGroupDisabled] = useState(true);
  const [id, setId] = useState("");
  const [reservation_no, setReservation_no] = useState("R001");
  const [enteredNIC, setEnteredNIC] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [reservation_date, setReservation_date] = useState("");
  const [train_id, setTrainID] = useState("5");
  const [train_name, setTrainName] = useState("Yal Devi Express");
  const [status, setStatus] = useState("Active");
  const [travel_route, setTravelRoute] = useState("Colombo - Badulla");
  const [fromValidate, setFromValidate] = useState("");
  const [fromValidateSuccess, setfromValidateSuccess] = useState("");
  const [validateAlert, setValidateAlert] = useState(false);
  const [validateAlertSuccess, setValidateAlertSuccess] = useState(false);

  //Retriew Booking Details
  useEffect(() => {
    axios
      .get(`http://localhost:5041/api/TicketBooking`)
      .then((response) => {
        setBookingDetails(response.data);
        // Extract and display all reference IDs
        const referenceIds = response.data.map((item) => item.reference_id);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const onSubmitNIC = () => {
    const enteredNICNumber = parseInt(enteredNIC, 10); // Parse enteredNIC to a Integer number

    const referenceIds = booking_details.map((item) =>
      parseInt(item.reference_id, 10)
    );
    console.log(referenceIds.length);

    // Count the occurrences of enteredNICNumber in referenceIds
    const countOfEnteredNIC = referenceIds.filter(
      (id) => id === enteredNICNumber
    ).length;

    // Check both conditions
    if (countOfEnteredNIC < 4 && referenceIds.includes(enteredNICNumber)) {
      setSuccess("NIC Validated Successfully");
      setError("");
      setIsInputGroupDisabled(false);
    } else if (countOfEnteredNIC >= 4) {
      // Entered NIC found 4 or more times in Database
      setSuccess("");
      setError("Already User Booked 4 Reservations");
      setIsInputGroupDisabled(true);
    } else {
      // User Not Found or Entered NIC Not Matching Reference IDs
      setSuccess("");
      setError("User Not Found In Database");
      setIsInputGroupDisabled(true);
    }
  };

  const currentDate = getCurrentDate();
  const { formattedCurrentDate, formattedMinDate, formattedMaxDate } =
    getFormattedDates(currentDate);

  const handleClassChange = (e) => {
    setSelectedClass(parseInt(e.target.value, 10)); // Parse the value to an integer
  };

  const handleTicketCountChange = (e) => {
    setNumberOfTickets(parseInt(e.target.value, 10)); // Parse the value to an integer
  };

  const totalPrice = calculateTotalPrice(selectedClass, numberOfTickets); // Calculate total price

  const onSubmit = (e) => {
    e.preventDefault();
    //Check Input Validations
    if (from === "") {
      setValidateAlert(true);
      setFromValidate("Please Input Starting Point");
    } else if (to === "") {
      setValidateAlert(true);
      setFromValidate("Please Input Destination");
    } else if (reservation_date === "") {
      setValidateAlert(true);
      setFromValidate("Please Input Reservation Date");
    } else if (selectedClass === "") {
      setValidateAlert(true);
      setFromValidate("Please Input Ticket Class");
    } else if (numberOfTickets === "") {
      setValidateAlert(true);
      setFromValidate("Please Input Number of Tickets");
    } else {
      setValidateAlert(false);

      const data = {
        Id: "",
        reservation_number: reservation_no,
        reference_id: enteredNIC,
        train_id: train_id,
        train_name: train_name,
        travel_route: travel_route,
        from: from,
        to: to,
        booking_date: formattedCurrentDate,
        reservation_date: reservation_date,
        ticket_class: selectedClass,
        number_of_tickets: numberOfTickets,
        total_Price: totalPrice,
        status: status,
      };
      console.log(data);
      //Api For save data in backend
      axios
        .post(`http://localhost:5041/api/TicketBooking`, data)
        .then((res) => {
          if (res.status === 200) {
            swal("Reservation successful", "", "success");

            setTimeout(() => {
              window.location = "/viewreservations";
            }, 3000);
          } else {
            console.error("Error: Unexpected response from server");
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });
    }
  };

  return (
    <div className="body">
      <TravelAgentNavBar />

      {/* Booking Details Form */}

      <div className="content-column m-3 mt-5">
        <Container className="shadow pt-2 pb-2 custom-bg-white mt-4 border rounded">
          <Form
            className="mt-2 p-3"
            onSubmit={onSubmit}
            encType="multipart/form-data"
          >
            <div className="row">
              <h3 className="text-center text-success">
                05 Yarl Devi Express &nbsp;
                <FontAwesomeIcon icon={faTrainSubway} />
              </h3>
              <h5 className="text-center">Colombo - Badulla</h5>
            </div>
            <div className="row mt-4">
              <div className="col-md-9">
                <h5>
                  Booking Details &nbsp;{" "}
                  <FontAwesomeIcon icon={faPersonWalkingLuggage} />
                </h5>
              </div>
              <div className="row"></div>
              <hr style={{ height: 10 }} />
              <div>
                {validateAlert ? (
                  <p>
                    <div className="alert alert-danger" role="alert">
                      {fromValidate}
                    </div>
                  </p>
                ) : (
                  <p></p>
                )}
                {validateAlertSuccess ? (
                  <p>
                    <div className="alert alert-success" role="alert">
                      {fromValidateSuccess}
                    </div>
                  </p>
                ) : (
                  <p></p>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>
                    <label>Reservation No</label>
                  </Form.Label>
                  <Form.Control type="text" placeholder="R0001" disabled />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <label>Reference ID (NIC)</label>
                  </Form.Label>
                  <div className="input-group">
                    <Form.Control
                      type="text"
                      placeholder="Enter NIC (Must be 12 Numbers)"
                      maxLength={12}
                      value={enteredNIC}
                      onChange={(e) => setEnteredNIC(e.target.value)}
                    />
                    <button
                      className="btn btn-warning"
                      type="button"
                      onClick={onSubmitNIC}
                    >
                      Validate
                    </button>
                  </div>
                  {/* Display error or success message */}
                  {error ? (
                    <div className="text-danger">
                      {error}&nbsp;
                      <FontAwesomeIcon icon={faCircleXmark} />
                    </div>
                  ) : success ? (
                    <div className="text-success">
                      {success}&nbsp;
                      <FontAwesomeIcon icon={faCircleCheck} />
                    </div>
                  ) : null}
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>
                    <label>From</label>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    disabled={isInputGroupDisabled}
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                  >
                    <option>Choose Station</option>
                    <option value="Colombo">Colombo</option>
                    <option value="Mount-Lavinia">Mount-Lavinia</option>
                    <option value="Maradana">Maradana </option>
                    <option value="Gampaha">Gampaha</option>
                    <option value="Kelaniya">Kelaniya</option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>
                    <label>To</label>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    disabled={isInputGroupDisabled}
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                  >
                    <option>Choose Station</option>
                    <option value="Badulla">Badulla</option>
                    <option value="Galle">Galle</option>
                    <option value="Matara">Matara</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Kankasanthurai">Kankasanthurai</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>
                    <label>Booking Date</label>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={formattedCurrentDate}
                    maxLength={12}
                    disabled
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <label>Reservation Date</label>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    min={formattedMinDate}
                    max={formattedMaxDate}
                    value={reservation_date}
                    onChange={(e) => setReservation_date(e.target.value)}
                    disabled={isInputGroupDisabled}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>
                    <label>Ticket Class</label>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={handleClassChange}
                    disabled={isInputGroupDisabled}
                  >
                    <option>Choose Class</option>
                    <option value="1">First Class</option>
                    <option value="2">Second Class</option>
                    <option value="3">Third Class </option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <label>Number of Tickets</label>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    max={25}
                    min={1}
                    placeholder="1"
                    onChange={handleTicketCountChange}
                    disabled={isInputGroupDisabled}
                  />
                </Form.Group>
              </div>
            </div>
            {/* Submit Button */}
            <div className="row">
              <div className="col-md-10 mt-5 p-2 d-flex justify-content-end">
                <label className="text-danger" style={{ fontSize: "20px" }}>
                  Total Tickets Price &nbsp;
                  <FontAwesomeIcon icon={faCoins} /> - {totalPrice} LKR
                  &nbsp;&nbsp;
                </label>
              </div>
              <div className="col-md-2 mt-5 d-flex justify-content-end">
                <Button
                  variant="success"
                  type="submit"
                  disabled={isInputGroupDisabled}
                >
                  Make Reservation
                </Button>
              </div>
            </div>
          </Form>
        </Container>
      </div>
      <div className="mt-5">&nbsp;</div>
    </div>
  );
}
