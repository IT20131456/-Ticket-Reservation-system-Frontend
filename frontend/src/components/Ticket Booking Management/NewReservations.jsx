import React from "react";
import { Form, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faTrainSubway, faPersonWalkingLuggage,faCoins} from "@fortawesome/free-solid-svg-icons";
import TravelAgentNavBar from "../Navbar/Travel Agent";
import logo from "../../images/logo.png";


export default function NewReservations() {


    const onSubmit = (e) => {};

  return (
    <div>
      <TravelAgentNavBar />   

      {/* Booking Details Form */}

      <div className="content-column m-3 mt-5">
        <Container className="shadow pt-2 pb-2 bg-white mt-4 border rounded">
          <Form className="mt-2 p-3">
            <div className="row">
              <h4 className="text-center text-success">05 Yarl Devi Express</h4>
              <h6 className="text-center">Colombo - Badulla</h6>
            </div>
            <div className="row mt-4">
              <div className="col-md-9">
                <h5>
                  Booking Details &nbsp; <FontAwesomeIcon icon={faTrainSubway} />
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
                    <label>Reservation ID</label>
                  </Form.Label>
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
                    <label>Reference ID (NIC)</label>
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
                      // value={junction_type}
                      // onChange={(e) => setjunction_type(e.target.value)}
                    >
                      <option>Choose Station</option>
                      <option value="1">Colombo</option>
                      <option value="2">Mount-Lavinia</option>
                      <option value="2">Maradana </option>
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
                      // value={junction_type}
                      // onChange={(e) => setjunction_type(e.target.value)}
                    >
                      <option>Choose Station</option>
                      <option value="1">Badulla</option>
                      <option value="2">Kankasanthurai</option>
                      <option value="2">Matara </option>
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
                    <label>Reservation Date</label>
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
                      // value={junction_type}
                      // onChange={(e) => setjunction_type(e.target.value)}
                    >
                      <option>Choose Class</option>
                      <option value="1">First Class</option>
                      <option value="2">Second Class</option>
                      <option value="2">Third Class </option>
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
                    placeholder="johnsmith34@gmail.com"
                    // value={junction_id}
                    // onChange={(e) => setjunction_id(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>
             {/* Submit Button */}
             <div className="row">           
                <div className="col-md-10 mt-5 p-2 d-flex justify-content-end">
                <label className="text-danger" > Total Tickets Price &nbsp;<FontAwesomeIcon icon={faCoins} /> - LKR 6000 &nbsp;&nbsp;</label>
                </div>
                <div className="col-md-2 mt-5 d-flex justify-content-end">
                <Button variant="success" type="submit" onClick={onSubmit}>
                  Make Reservation
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
