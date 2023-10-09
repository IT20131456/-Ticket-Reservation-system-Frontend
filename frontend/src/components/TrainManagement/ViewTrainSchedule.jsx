import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Container, Table, Badge } from "react-bootstrap";
import BackofficeNavBar from "../Navbar/Backoffice";
import {BASEURL} from '../Common';

export default function ViewTrainSchedule() {
  const [trainScheduleData, setTrainScheduleData] = useState([]);

  const fetchData = () => {
    axios
      .get("http://localhost:5041/api/trainschedule")
      .then((res) => {
        setTrainScheduleData(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    const intervalId = setInterval(fetchData, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
        <BackofficeNavBar />
      <Container className="shadow pt-2 pb-2 bg-white mt-4 border rounded">
        <Form className="mt-2 p-3">
          <div className="row">
            <div className="col-md-9">
              <h5>Train Schedules</h5>
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
                  <th>Stops</th>
                  <th>Seat Classes</th>
                  <th>No of Seats</th>
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
                      <td>{feed.intermediate_stops}</td>
                      <td>{feed.seat_classes}</td>
                      <td>{feed.number_of_seats}</td>
                      {/* {feed.lane01CounterTime === "40" ? (
                        <td>
                          <h5>
                            <Badge bg="danger">High</Badge>
                          </h5>
                        </td>
                      ) : feed.lane01CounterTime === "30" ? (
                        <td>
                          <h5>
                            <Badge bg="warning">Medium</Badge>
                          </h5>
                        </td>
                      ) : (
                        <td>
                          <h5>
                            <Badge bg="success">Low</Badge>
                          </h5>
                        </td>
                      )} */}
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
