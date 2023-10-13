/**
 * File: UpdateTrainSchedule.jsx
 * Author: IT20127046
 * @fileoverview This file provides the Update Train Schedule page of the
 *   Train Management feature.
 *  Redirects to View Train Schedule page after successful update.
 * Otherwise, an error message is displayed.
 */

import { React, useEffect, useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import {
  faTrainSubway,
  faPersonWalkingLuggage,
  faCoins,
} from "@fortawesome/free-solid-svg-icons";
import BackofficeNavBar from "../Navbar/Backoffice";
import logo from "../../images/logo.png";
import axios from "axios";
import swal from "sweetalert";

export default function UpdateTrainSchedule() {
  const { id } = useParams();
  const [train_number, settrain_number] = useState("");
  const [train_name, settrain_name] = useState("");
  const [train_type, settrain_type] = useState("");
  const [train_description, settrain_description] = useState("");
  const [departure_station, setdeparture_station] = useState("");
  const [arrival_station, setarrival_station] = useState("");
  const [departure_time, setdeparture_time] = useState("");
  const [arrival_time, setarrival_time] = useState("");
  const [travel_duration, settravel_duration] = useState("");
  const [intermediate_stops, setintermediate_stops] = useState("");
  const [seat_classes, setseat_classes] = useState("");
  const [number_of_seats, setnumber_of_seats] = useState("");

  const [intermediateStopsArray, setIntermediateStopsArray] = useState([]);
  const [seatClassesArray, setSeatClassesArray] = useState([
    "First-Class",
    "Second-Class",
  ]);
  const [numberOfSeatsArray, setNumberOfSeatsArray] = useState(["50", "100"]);
  const [isActive, setIsActive] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:5041/api/trainschedule/${id}`)
      .then((response) => {
        settrain_number(response.data.train_number);
        settrain_name(response.data.train_name);
        settrain_type(response.data.train_type);
        settrain_description(response.data.train_description);
        setdeparture_station(response.data.departure_station);
        setarrival_station(response.data.arrival_station);
        setdeparture_time(response.data.departure_time);
        setarrival_time(response.data.arrival_time);
        settravel_duration(response.data.travel_duration);
        setintermediate_stops(response.data.intermediate_stops);
        //   setseat_classes(response.data.seat_classes);
        //   setnumber_of_seats(response.data.number_of_seats);
        setIsActive(response.data.isActive);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();

    // Update the intermediate stops array
    const updateIntermediateStopsArray = () => {
      // Split the comma-separated values and remove any leading/trailing spaces
    //   const stopsArray = intermediate_stops
    //     .split(",")
    //     .map((stop) => stop.trim());
    //   setIntermediateStopsArray(stopsArray);

      // Now that the intermediate stops array is updated, you can create newTrainSchedule
      const updateTrainSchedule = {
        id: id,
        train_number: train_number,
        train_name: train_name,
        train_type: train_type,
        train_description: train_description,
        departure_station: departure_station,
        arrival_station: arrival_station,
        departure_time: departure_time,
        arrival_time: arrival_time,
        travel_duration: travel_duration,
        intermediate_stops: intermediateStopsArray, // Use the updated stopsArray here
        seat_classes: seatClassesArray,
        number_of_seats: numberOfSeatsArray,
        isActive: isActive,
      };

      console.log(updateTrainSchedule);

      axios
        .put(`http://localhost:5041/api/trainschedule/${id}`, updateTrainSchedule)
        .then((res) => {
          // Check if the response status code is 200 (OK)
          if (res.status === 200) {
            swal("Scheduled successful", "", "success");

            setTimeout(() => {
              window.location = "/trainschedule/view";
            }, 3000);
          } else {
            console.error("Error: Unexpected response from server");
            // Handle unexpected response from the server if needed
          }
        })
        .catch((error) => {
          console.error("Error:", error.message);
          // Handle network or other errors if needed
        });
    };

    updateIntermediateStopsArray();
  };

  return (
    <div>
      <BackofficeNavBar />

      {/* Booking Details Form */}

      <div className="content-column m-3 mt-5">
        <Container className="shadow pt-2 pb-2 bg-white mt-4 border rounded">
          <Form className="mt-2 p-3">
            <div className="row">
              <h4 className="text-center text-success">
                Update Train Schedule
              </h4>
              {/* <h6 className="text-center">Colombo - Badulla</h6> */}
            </div>
            <div className="row mt-4">
              <div className="col-md-9">
                <h5>
                  <FontAwesomeIcon icon={faTrainSubway} />
                  &nbsp; Train Schedule Details &nbsp;{" "}
                </h5>
              </div>
              <div className="row"></div>
              <hr style={{ height: 10 }} />
            </div>
            <h4 className="text-danger">Train Information:</h4> &nbsp;{" "}
            {isActive === 1 ? (
              <>
                <Button
                  variant="success"
                  onClick={() => {
                    setIsActive(1);
                  }}
                >
                  Active Train
                </Button>
                &nbsp;{" "}
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsActive(0);
                  }}
                >
                  Deactive Train
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsActive(1);
                  }}
                >
                  Active Train
                </Button>
                &nbsp;{" "}
                <Button
                  variant="danger"
                  onClick={() => {
                    setIsActive(0);
                  }}
                >
                  Deactive Train
                </Button>
              </>
            )}
            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>
                    <label>Train Number(ID):</label>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: 1015"
                    maxLength={4}
                    value={train_number}
                    onChange={(e) => settrain_number(e.target.value)}
                    // value={junction_name}
                    // onChange={(e) => setjunction_name(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <label>Train Name:</label>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: Udarata Menike"
                    value={train_name}
                    onChange={(e) => settrain_name(e.target.value)}
                    // value={junction_id}
                    // onChange={(e) => setjunction_id(e.target.value)}
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
                    <label>Train Type:</label>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={train_type}
                    onChange={(e) => settrain_type(e.target.value)}
                    // value={junction_type}
                    // onChange={(e) => setjunction_type(e.target.value)}
                  >
                    <option>Choose Type</option>
                    <option value="Express">Express</option>
                    <option value="Intercity Express">Intercity Express</option>
                    <option value="Slow">Slow </option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <label>Train Description:</label>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: 1015 Udarata Menike - Colombo Fort - Badulla"
                    value={train_description}
                    onChange={(e) => settrain_description(e.target.value)}
                    // value={junction_id}
                    // onChange={(e) => setjunction_id(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
            <h4 className="text-danger">Train Schedule:</h4> &nbsp;{" "}
            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>
                    <label>Departure Station:</label>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={departure_station}
                    onChange={(e) => setdeparture_station(e.target.value)}
                    // value={junction_type}
                    // onChange={(e) => setjunction_type(e.target.value)}
                  >
                    <option>Departure Station</option>
                    <option value="Colombo-Fort">Colombo-Fort</option>
                    <option value="Mount-Lavinia">Mount-Lavinia</option>
                    <option value="Maradana">Maradana </option>
                  </Form.Select>
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>
                    <label>Arrival Station:</label>
                  </Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    value={arrival_station}
                    onChange={(e) => setarrival_station(e.target.value)}
                    // value={junction_type}
                    // onChange={(e) => setjunction_type(e.target.value)}
                  >
                    <option>Arrival Station</option>
                    <option value="Badulla">Badulla</option>
                    <option value="Kankasanthurai">Kankasanthurai</option>
                    <option value="Matara">Matara </option>
                  </Form.Select>
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <label>Departure Time:</label>
                  </Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="johnsmith34@gmail.com"
                    value={departure_time}
                    onChange={(e) => setdeparture_time(e.target.value)}
                    // value={junction_id}
                    // onChange={(e) => setjunction_id(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <label>Arrival Time:</label>
                  </Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="johnsmith34@gmail.com"
                    value={arrival_time}
                    onChange={(e) => setarrival_time(e.target.value)}
                    // value={junction_id}
                    // onChange={(e) => setjunction_id(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <label>Travel Duration:</label>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: 9 hours 20 minutes"
                    value={travel_duration}
                    onChange={(e) => settravel_duration(e.target.value)}
                    // value={junction_id}
                    // onChange={(e) => setjunction_id(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <label>Intermediate Stops:</label>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: Colombo Fort,Ragama,Gampaha,Veyangoda"
                    value={intermediate_stops}
                    onChange={(e) => setintermediate_stops(e.target.value)}
                    // value={junction_id}
                    // onChange={(e) => setjunction_id(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
            <h4 className="text-danger">Seat Availability:</h4> &nbsp;{" "}
            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>
                    <label>Seat Classes</label>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: First-Class, Second-Class"
                    value={seat_classes}
                    onChange={(e) => setseat_classes(e.target.value)}
                    // value={junction_name}
                    // onChange={(e) => setjunction_name(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput1"
                >
                  <Form.Label>
                    <label>Number of Seats:</label>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ex: First-Class, Second-Class"
                    value={number_of_seats}
                    onChange={(e) => setnumber_of_seats(e.target.value)}
                    // value={junction_id}
                    // onChange={(e) => setjunction_id(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
            {/* Submit Button */}
            <div className="row">
              <div className="col-md-10 mt-5 p-2 d-flex justify-content-end"></div>
              <div className="col-md-2 mt-5 d-flex justify-content-end">
                <Button variant="success" type="submit" onClick={onSubmit}>
                  Update Train Schedule
                </Button>
              </div>
            </div>
          </Form>
        </Container>
      </div>
      <div className="mt-5"></div>
    </div>
  );
}
