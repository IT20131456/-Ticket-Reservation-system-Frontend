import React from "react";
import { Form, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrainSubway ,faPersonWalkingLuggage} from "@fortawesome/free-solid-svg-icons";
import TravelAgentNavBar from "../Navbar/Travel Agent";

export default function NewReservations() {
  const onSubmit = (e) => {};

  return (
    <div>
      <TravelAgentNavBar />

      {/* Traveler Details Form */}
      <div className="content-column m-3 mt-5">
        <Container className=" pt-2 pb-2 bg-white mt-4 border rounded">
          <Form className="mt-4 p-3">
            <div className="row">
              <div className="col-md-10">
                <h5>
                  Traveler Details <FontAwesomeIcon icon={faPersonWalkingLuggage} />
                </h5>
              </div>
              <div className="col-md-2">
                <h6 class="">Reservation ID - R001</h6>
              </div>
              <div className="row"></div>
              <hr style={{ height: 10 }} />
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>
                    <b>Reference ID (NIC)</b>
                  </Form.Label>
                  &nbsp;&nbsp;
                  <Form.Control
                    type="text"
                    placeholder="200045852352"
                    maxLength={12}
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
                    <b>Traveler Name</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John Smith"
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
                    <b>Phone Number</b>
                  </Form.Label>
                  &nbsp;&nbsp;
                  <Form.Control
                    type="text"
                    placeholder="077 123 4567"
                    maxLength={12}
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
                    <b>Email</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="johnsmith34@gmail.com"
                    // value={junction_id}
                    // onChange={(e) => setjunction_id(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Container>
      </div>

       {/* Booking Details Form */}

      <div className="content-column m-3 mt-5">
        <Container className="pt-2 pb-2 bg-white mt-4 border rounded">
          <Form className="mt-4 p-3">
            <div className="row">
              <div className="col-md-10">
                <h5>
                Booking Details <FontAwesomeIcon icon={faTrainSubway} />
                </h5>
              </div>            
              <div className="row"></div>
              <hr style={{ height: 10 }} />
            </div>

            <div className="row">
              <div className="col-md-6">
                <Form.Group
                  className="mb-3"
                  controlId="exampleForm.ControlInput2"
                >
                  <Form.Label>
                    <b>Reference ID (NIC)</b>
                  </Form.Label>
                  &nbsp;&nbsp;
                  <Form.Control
                    type="text"
                    placeholder="200045852352"
                    maxLength={12}
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
                    <b>Traveler Name</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John Smith"
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
                    <b>Phone Number</b>
                  </Form.Label>
                  &nbsp;&nbsp;
                  <Form.Control
                    type="text"
                    placeholder="077 123 4567"
                    maxLength={12}
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
                    <b>Email</b>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="johnsmith34@gmail.com"
                    // value={junction_id}
                    // onChange={(e) => setjunction_id(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
          </Form>
        </Container>
      </div>


    </div>
  );
}
