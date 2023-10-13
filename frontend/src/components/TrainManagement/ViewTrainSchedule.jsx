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
import {BASEURL_LOCAL_LOSHITH} from '../Common';
import "./ViewTrainSchedule.css";

// This function is used to render the view train schedule page.
export default function ViewTrainSchedule() {
  const [trainScheduleData, setTrainScheduleData] = useState([]);

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

  useEffect(() => {
    fetchData();

  }, []);

  // This function is used to cancel a train schedule.
  const onCancelSchedule = (id) => {
    axios
      .put(`${BASEURL_LOCAL_LOSHITH}/api/trainschedule/cancel/${id}`)
      .then((res) => {
        console.log(res);
        fetchData();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
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
                            <Badge bg="secondary">Cancelled</Badge>
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
                          onClick={onCancelSchedule(feed.id)}
                        >
                          Cancel
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
