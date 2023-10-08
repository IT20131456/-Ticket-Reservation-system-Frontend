import React from 'react'
import TravelAgentNavBar from "../../Navbar/Travel Agent";
import { Form, Container, Button } from "react-bootstrap";

export default function ViewResrvations() {

const onSubmit = (e) => {
  e.preventDefault()
  window.location.href = "/newreservation";
}


  return (
    <div>
 <TravelAgentNavBar />  
 <Button variant="success" type="submit" onClick={onSubmit}>
                  Make Reservation
                </Button>
    </div>
  )
}
