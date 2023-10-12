import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Form, Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrainSubway,faCoins, faCircleCheck, faPersonWalkingLuggage,faCircleXmark} from "@fortawesome/free-solid-svg-icons";
import TravelAgentNavBar from "../../Navbar/Travel Agent";
import { getCurrentDate, getFormattedDates } from "./Validations/DateValidations";
import { calculateTotalPrice } from "./Validations/TicketPriceValidation";
import "./styles.css";
import swal from "sweetalert";

export default function UpdateReservation() {

  const { id } = useParams();
  const [enableEditing, setEnableEditing] = useState(false);
  const [selectedClass, setSelectedClass] = useState("1");
  const [numberOfTickets, setNumberOfTickets] = useState(1);
  const [booking_details, setBookingDetails] = useState([]);
  const [reservation_no, setReservation_no] = useState("");
  const [reference_id, setReference_id] = useState("");
  const [train_id, setTrain_Id] = useState("");
  const [train_name, setTrain_name] = useState("");
  const [travel_route, setTravel_route] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [updated_booking_date, setUpdatedBooking_date] = useState("");
  const [reservation_date, setReservation_date] = useState("");
  const [ticket_class, setTicket_class] = useState("");
  const [ticket_count, setTicket_count] = useState(""); 
  const [status, setStatus] = useState("Updated"); 

  useEffect(() => {
    axios.get(`http://localhost:5041/api/TicketBooking/${id}`).then((response) => {
      setBookingDetails(response.data);
      console.log(response.data.reservation_number);
      setReservation_no(response.data.reservation_number);
      setReference_id(response.data.reference_id);
      setTrain_Id(response.data.train_id);
      setTrain_name(response.data.train_name);
      setTravel_route(response.data.travel_route);
      setFrom(response.data.from);
      setTo(response.data.to);
      setUpdatedBooking_date(response.data.updated_booking_date);
      setReservation_date(response.data.reservation_date);
      setTicket_class(response.data.ticket_class);
      setTicket_count(response.data.number_of_tickets);      
     
    });

  }, []);



  const currentDate = getCurrentDate();
  const { formattedCurrentDate, formattedMinDate, formattedMaxDate } = getFormattedDates(currentDate);
  
  const handleClassChange = (e) => {
    setTicket_class(e.target.value); // Set ticket_class state
    setSelectedClass(parseInt(e.target.value, 10)); // Parse the value to an integer and set another state if needed
  };
  

  const handleTicketCountChange = (e) => {
    setTicket_count(e.target.value); // Set ticket_count state
    setNumberOfTickets(parseInt(e.target.value, 10)); // Parse the value to an integer
  };

  const totalPrice = calculateTotalPrice(selectedClass, numberOfTickets); // Calculate total price

  const onSubmit = (e) => {
    e.preventDefault();
  
    const data = {
      Id:id,
      reservation_number: reservation_no,
      reference_id: reference_id,
      train_id: train_id,
      train_name: train_name,
      travel_route: travel_route,
      from: from,
      to: to,
      booking_date: formattedCurrentDate,
      reservation_date: reservation_date,
      ticket_class: selectedClass,
      number_of_tickets: numberOfTickets,
      total_price: totalPrice,
      status: status,
    };
  console.log(data);
    axios
      .put(`http://localhost:5041/api/TicketBooking/${id}`, data)
      .then((res) => {
        // Check if the response status code is 200 (OK)
        if (res.status === 200) {
          swal("Ticket Booking Updated Successfully", "", "success");
    
          setTimeout(() => {
            window.location = "/viewreservations";
          }, 12000);
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
  

  return (
    <div className="body">
      <TravelAgentNavBar />     

      {/* Booking Details Form */}

      <div className="content-column m-3 mt-5">
        <Container className="shadow pt-2 pb-2 custom-bg-white mt-4 border rounded">
          <Form className="mt-2 p-3">          
            <div className="row mt-4">
              <div className="col-md-9">
                <h5>
                  Update Booking Details &nbsp;{" "}
                  <FontAwesomeIcon icon={faTrainSubway} />
                </h5>
              </div>
              <div className="col-md-3 ">
                  <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="&nbsp;Enable Editing"
                    checked={enableEditing}
                    onChange={() => setEnableEditing(!enableEditing)}
                  />
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
                    disabled   
                    value={reservation_no}             
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
                      maxLength={12}
                      value={reference_id}
                      disabled                    
                    />               
                   
                  </div>                   
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
                     disabled={!enableEditing}
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
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
                  <Form.Select aria-label="Default select example"   onChange={(e) => setTo(e.target.value)} disabled={!enableEditing} value={to}>
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
                    <label>Updated Booking Date</label>
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
                   disabled={!enableEditing}
                   value={reservation_date}
                   onChange={(e) => setReservation_date(e.target.value)}
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
                  <Form.Select aria-label="Default select example" value={ticket_class}  onChange={(e) => handleClassChange(e)} disabled={!enableEditing}>
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
                  <Form.Control type="number" placeholder={numberOfTickets}  max={25} min={1} value={ticket_count} onChange={(e) => handleTicketCountChange(e)} disabled={!enableEditing}/>
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
                <Button variant="primary" type="submit" onClick={onSubmit}>
                  Update Reservation
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
