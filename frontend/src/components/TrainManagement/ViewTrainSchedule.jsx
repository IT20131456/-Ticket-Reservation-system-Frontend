/**
 * File: ViewTrainSchedule.jsx
 * Author: IT20127046
 * @fileoverview This file renders the view train schedule page.
 * View train schedule page displays all the train schedules in the database.
 * Train schedules can be cancelled from this page.
 * Train schedules can be updated from this page.
 * Train schedules can be added from this page.
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Container, Table, Badge, Button } from "react-bootstrap";
import BackofficeNavBar from "../Navbar/Backoffice";
import { BASEURL_LOCAL_LOSHITH } from "../Common";
import "./ViewTrainSchedule.css";
import swal from "sweetalert2";

// This function is used to render the view train schedule page.
export default function ViewTrainSchedule() {
  const [trainScheduleData, setTrainScheduleData] = useState([]);
  const [currentBookingData, setCurrentBookingData] = useState([]);
  const [isCancel, setIsCancel] = useState(3);

  const [intermediateStopsArray, setIntermediateStopsArray] = useState([]);
  const [seatClassesArray, setSeatClassesArray] = useState([
    "First-Class",
    "Second-Class",
  ]);
  const [numberOfSeatsArray, setNumberOfSeatsArray] = useState(["50", "100"]);

  const fetchData = () => {
    axios
      .get(`${BASEURL_LOCAL_LOSHITH}/api/trainschedule`)
      .then((res) => {
        setTrainScheduleData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const fetchCurrentBookingData = () => {
    axios
      .get(`${BASEURL_LOCAL_LOSHITH}/api/TicketBooking`)
      .then((res) => {
        console.log(res.data);
        setCurrentBookingData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchData();
    fetchCurrentBookingData();
  }, []);

  const onCancelSchedule = (
    train_number,
    id,
    train_name,
    train_type,
    train_description,
    departure_station,
    arrival_station,
    departure_time,
    arrival_time,
    travel_duration
  ) => {
    // Check if the train_number exists in currentBookingData
    const hasOngoingBookings = currentBookingData.some(
      (booking) => booking.train_id === train_number
    );

    if (hasOngoingBookings) {
      // Display a SweetAlert message
      swal.fire({
        title: "Cannot Cancel Schedule",
        text: "This train schedule cannot be canceled due to ongoing bookings.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } else {
      swal
        .fire({
          title: "Are you sure?",
          text: `Do you want to cancel the train with number: ${train_number}?`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Yes, cancel it!",
          cancelButtonText: "No, keep it",
        })
        .then((result) => {
          if (result.isConfirmed) {
            // axios
            //   .delete(`${BASEURL_LOCAL_LOSHITH}/api/TrainSchedule/${id}`)
            //   .then((res) => {
            //     console.log(res);
            //     fetchData();
            //     fetchCurrentBookingData();
            //   })
            //   .catch((error) => {
            //     console.error("Error fetching data:", error);
            //   });

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
              isActive: 3,
            };

            axios
              .put(
                `${BASEURL_LOCAL_LOSHITH}/api/TrainSchedule/${id}`,
                updateTrainSchedule
              )
              .then((res) => {
                // Check if the response status code is 200 (OK)
                if (res.status === 200) {
                  //swal.new("Train scheduled cancelled successful", "", "success");
                  fetchData();
                  fetchCurrentBookingData();
                } else {
                  console.error("Error: Unexpected response from server");
                  // Handle unexpected response from the server if needed
                }
              })
              .catch((error) => {
                console.error("Error:", error.message);
                // Handle network or other errors if needed
              });
          }
        });
    }
  };

  const onDelete = (id, train_number) => {
    swal
      .fire({
        title: "Are you sure?",
        text: `Do you want to delete the train with number: ${train_number}?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, cancel it!",
        cancelButtonText: "No, keep it",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`${BASEURL_LOCAL_LOSHITH}/api/TrainSchedule/${id}`)
            .then((res) => {
              console.log(res);
              fetchData();
              fetchCurrentBookingData();
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
      });
  };

  return (
    <div className="setBackgroundImage">
      <BackofficeNavBar />
      <Container className="shadow pt-2 pb-2 bg-white mt-4 border rounded">
        <Form className="mt-2 p-3">
          <div className="row">
            <div className="col-md-9">
              <h5>Train Schedules</h5>
            </div>

            <div className="col-md-4">
              <a className="btn btn-success m-2" href="/trainschedule/add">
                Add Train Schedule
              </a>
            </div>

            <div className="row"></div>
            <div className="col-md-12">
              <hr style={{ height: 10 }} />
            </div>
          </div>
        </Form>
        <div className="pl-3 pr-3">
          {trainScheduleData.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Train Number ID</th>
                  <th>Train Name</th>
                  <th>Train Type</th>
                  <th>Train Description</th>
                  <th>Departure Station</th>
                  <th>Arrival Station</th>
                  <th>Departure Time</th>
                  <th>Arrival Time</th>
                  <th>Travel Duration</th>
                  {/* <th>Stops</th> */}
                  <th>Seat Classes</th>
                  <th>No of Seats</th>
                  <th>Status</th>
                  <th>Update</th>
                  <th>Cancel</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {trainScheduleData.map((feed) => (
                  <>
                    <tr>
                      <td>{feed.train_number}</td>
                      <td>{feed.train_name}</td>
                      <td>{feed.train_type}</td>
                      <td>{feed.train_description}</td>
                      <td>{feed.departure_station}</td>
                      <td>{feed.arrival_station}</td>
                      <td>{feed.departure_time}</td>
                      <td>{feed.arrival_time}</td>
                      <td>{feed.travel_duration}</td>
                      {/* <td>{feed.intermediate_stops}</td> */}
                      <td>{feed.seat_classes}</td>
                      <td>{feed.number_of_seats}</td>
                      {feed.isActive === 1 ? (
                        <td>
                          <h5>
                            <Badge bg="success">Active</Badge>
                          </h5>
                        </td>
                      ) : feed.isActive === 0 ? (
                        <td>
                          <h5>
                            <Badge bg="warning">Not-Active</Badge>
                          </h5>
                        </td>
                      ) : feed.isActive === 3 ? (
                        <td>
                          <h5>
                            <Badge bg="warning">Cancelled</Badge>
                          </h5>
                        </td>
                      ) : (
                        <td>
                          <h5>
                            <Badge bg="danger">!Error</Badge>
                          </h5>
                        </td>
                      )}
                      <td>
                        <Button
                          className="btn btn-secondary"
                          onClick={() => {
                            window.location.href = `/trainschedule/update/${feed.id}`;
                          }}
                        >
                          Update
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="btn btn-danger"
                          onClick={() =>
                            onCancelSchedule(
                              feed.train_number,
                              feed.id,
                              feed.train_name,
                              feed.train_type,
                              feed.train_description,
                              feed.departure_station,
                              feed.arrival_station,
                              feed.departure_time,
                              feed.arrival_time,
                              feed.travel_duration,
                              feed.seat_classes,
                              feed.number_of_seats
                            )
                          }
                        >
                          Cancel
                        </Button>
                      </td>
                      <td>
                        <Button
                          className="btn btn-danger"
                          onClick={() => onDelete(feed.train_number, feed.id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  </>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No data available</p>
          )}
        </div>
        {/* ... rest of the component code */}
      </Container>
    </div>
  );
}
