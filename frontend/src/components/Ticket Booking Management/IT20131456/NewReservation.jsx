import React, { useState } from "react";
import { Form, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrainSubway,faCoins, faCircleCheck, faPersonWalkingLuggage,faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import TravelAgentNavBar from "../../Navbar/Travel Agent";
import { getCurrentDate, getFormattedDates } from "./Validations/DateValidations";
import { validateNIC } from "./Validations/NicValidation";
import { calculateTotalPrice } from "./Validations/TicketPriceValidation";


export default function NewReservations() {

  const [enteredNIC, setEnteredNIC] = useState("");
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [isInputGroupDisabled, setIsInputGroupDisabled] = useState(true);

  const onSubmitNIC = () => {
    const { success: successMessage, error: errorMessage } = validateNIC(parseInt(enteredNIC, 10));
    setSuccess(successMessage);
    setError(errorMessage);
    setIsInputGroupDisabled(errorMessage ? true : false);
  };

  const currentDate = getCurrentDate();
  const { formattedCurrentDate, formattedMinDate, formattedMaxDate } = getFormattedDates(currentDate);
  
  const handleClassChange = (e) => {
    setSelectedClass(parseInt(e.target.value, 10)); // Parse the value to an integer
  };

  const handleTicketCountChange = (e) => {
    setNumberOfTickets(parseInt(e.target.value, 10)); // Parse the value to an integer
  };

  const totalPrice = calculateTotalPrice(selectedClass, numberOfTickets); // Calculate total price

  const onSubmit = (e) => {};

  return (
    <div>
      <TravelAgentNavBar />     

      {/* Booking Details Form */}

      <div className="content-column m-3 mt-5">
        <Container className="shadow pt-2 pb-2 bg-white mt-4 border rounded">
          <Form className="mt-2 p-3">
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
                  <Form.Control
                    type="text"
                    placeholder="R0001"
                    disabled
                    // value={junction_name}
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
                   {/* Display error message */}
                   {error && <div className="text-danger">{error}&nbsp;<FontAwesomeIcon icon={faCircleXmark} /></div>}
                   {/* Display success message */}
                   {success && <div className="text-success">{success}&nbsp;<FontAwesomeIcon icon={faCircleCheck} /></div>}
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
                    // value={junction_type}
                    // onChange={(e) => setjunction_type(e.target.value)}
                  >
                    <option>Choose Station</option>
                    <option value="Colombo">Colombo</option>
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
                    <label>To</label>
                  </Form.Label>
                  <Form.Select aria-label="Default select example" disabled={isInputGroupDisabled}>
                    <option>Choose Station</option>
                    <option value="Badulla">Badulla</option>
                    <option value="Kankasanthurai">Kankasanthurai</option>
                    <option value="Matara">Matara</option>
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
                  <Form.Select aria-label="Default select example" onChange={handleClassChange} disabled={isInputGroupDisabled}>
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
                  <Form.Control type="number" max={25} min={1} onChange={handleTicketCountChange} disabled={isInputGroupDisabled}/>
                </Form.Group>
              </div>
            </div>
            {/* Submit Button */}
            <div className="row">
              <div className="col-md-10 mt-5 p-2 d-flex justify-content-end">
                <label className="text-danger" style={{ fontSize: "20px" }}>
                  Total Tickets Price &nbsp;
                  <FontAwesomeIcon icon={faCoins} /> - {totalPrice} LKR &nbsp;&nbsp;
                </label>
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
