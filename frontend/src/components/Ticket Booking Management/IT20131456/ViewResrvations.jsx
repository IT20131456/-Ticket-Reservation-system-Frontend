/**
 * Filename: ViewReservations.js
 * Author: IT20131456
 * Description: React component for displaying and managing reservations in the Ticket Booking system.
 *              Allows travel agents to view, update, and delete reservations.
 */
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Container, Table, Button } from "react-bootstrap";
import TravelAgentNavBar from "../IT20131456/ViewResrvationNavbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan, faCalendarPlus,} from "@fortawesome/free-solid-svg-icons";
import "./styles.css";
import swal from "sweetalert";

export default function ViewResrvations() {
  const [booking_details, setBookingDetails] = useState([]);
  const [error, setError] = useState(null);
  const [fromValidate, setFromValidate] = useState("");
  const [fromValidateSuccess, setfromValidateSuccess] = useState("");
  const [validateAlert, setValidateAlert] = useState(false);
  const [validateAlertSuccess, setValidateAlertSuccess] = useState(false);
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

//Retrive data from the database
  useEffect(() => {
    axios
      .get(`http://localhost:5041/api/TicketBooking`)
      .then((response) => {
        setBookingDetails(response.data);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  //Function to check the reservation date is within 5 days from the booking date
  const isActionButtonDisabled = (reservationDate) => {
    const currentDate = new Date();
    const formattedReservationDate = new Date(reservationDate);
    const differenceInMilliseconds = formattedReservationDate - currentDate;
    const differenceInDays =
      Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24)) + 1;
    return differenceInDays <= 5;
  };

  const onDelete = (id) => {
    // Show a confirmation dialog before deletion
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this record!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`http://localhost:5041/api/TicketBooking/${id}`)
          .then((res) => {
            if (res.data.success) {
            } else {
              window.location.reload();
            }
          });
      } else {
        swal("Record deletion canceled!", {
          icon: "info",
        });
      }
    });
  };

  //Search booking details
  const searchItems = (searchValue) => {
    setSearchInput(searchValue);
    if (searchInput !== "") {
      const filteredData = booking_details.filter((item) => {
        return Object.values(item)
          .join("")
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(booking_details);
    }
  };

  return (
    <div className="body">
      <TravelAgentNavBar />
      <div className="content-column m-3 mt-5">
        <div className="mt-5 ">
          <div className="shadow  p-4 custom-bg-white mt-5 border rounded">
            <div className="row">

              <div className="col-md-7">
                <h4>Ticket Bookings</h4>
              </div>

              <div className="col-md-3">
              <input
                  className="form-control border border-dark"
                  type="search"
                  placeholder="Search Booking"
                  onChange={(e) => searchItems(e.target.value)}
                ></input>            
              </div>
              <div className="col-md-2">
                <Button
                  onClick={() => {
                    window.location.href = "/newreservation";
                  }}
                  className="bg-success text-white m- ml-0"
                >
                  <FontAwesomeIcon icon={faCalendarPlus} />
                  &nbsp;New Reservation
                </Button>              
              </div>  
                
          
            </div>

            <hr style={{ height: 10 }} />
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Ref ID (NIC)</th>
                  <th scope="col">Train ID</th>
                  <th scope="col">From</th>
                  <th scope="col">To</th>
                  <th scope="col">Booking Date</th>
                  <th scope="col">Reservation Date</th>
                  <th scope="col">Ticket Class</th>
                  <th scope="col">No of Tickets</th>
                  <th scope="col">Total Price</th>
                  <th scope="col">Status</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
  {searchInput.length > 0
    ? filteredResults.map((booking, index) => (
        <tr key={booking.id}>
          <th>{index + 1}</th>
          <td>{booking.reference_id}</td>
          <td>{booking.train_id}</td>
          <td>{booking.from}</td>
          <td>{booking.to}</td>
          <td>{booking.booking_date}</td>
          <td>{booking.reservation_date}</td>
          <td>{booking.ticket_class}</td>
          <td>{booking.number_of_tickets}</td>
          <td>{"LKR" + " " + booking.total_price}</td>
          <td>{booking.status}</td>
          <td className="text-center">
            <Button
              className={`bg-success text-white m- ml-0 ${
                isActionButtonDisabled(booking.reservation_date) ? "disabled" : ""
              }`}
              disabled={isActionButtonDisabled(booking.reservation_date)}
              onClick={() => {
                window.location.href = `/updatereservation/${booking.id}`;
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              &nbsp;Update
            </Button>
            &nbsp;&nbsp;
            <Button
              className={`bg-danger text-white m- ml-0 ${
                isActionButtonDisabled(booking.reservation_date) ? "disabled" : ""
              }`}
              disabled={isActionButtonDisabled(booking.reservation_date)}
              onClick={() => onDelete(booking.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              &nbsp;Delete
            </Button>
          </td>
        </tr>
      ))
    : booking_details.map((booking, index) => (
        <tr key={booking.id}>
          <th>{index + 1}</th>
          <td>{booking.reference_id}</td>
          <td>{booking.train_id}</td>
          <td>{booking.from}</td>
          <td>{booking.to}</td>
          <td>{booking.booking_date}</td>
          <td>{booking.reservation_date}</td>
          <td>{booking.ticket_class}</td>
          <td>{booking.number_of_tickets}</td>
          <td>{"LKR" + " " + booking.total_price}</td>
          <td>{booking.status}</td>
          <td className="text-center">
            <Button
              className={`bg-success text-white m- ml-0 ${
                isActionButtonDisabled(booking.reservation_date) ? "disabled" : ""
              }`}
              disabled={isActionButtonDisabled(booking.reservation_date)}
              onClick={() => {
                window.location.href = `/updatereservation/${booking.id}`;
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
              &nbsp;Update
            </Button>
            &nbsp;&nbsp;
            <Button
              className={`bg-danger text-white m- ml-0 ${
                isActionButtonDisabled(booking.reservation_date) ? "disabled" : ""
              }`}
              disabled={isActionButtonDisabled(booking.reservation_date)}
              onClick={() => onDelete(booking.id)}
            >
              <FontAwesomeIcon icon={faTrashCan} />
              &nbsp;Delete
            </Button>
          </td>
        </tr>
      ))}
</tbody>

            </Table>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "auto" }}>&nbsp;</div>
    </div>
  );
}
