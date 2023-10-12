import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../images/logo.png";
import trainLogo from "../../images/train-logo-01.png";

function LandningPageNav() {
  return (
    <Navbar
      bg=""
      data-bs-theme="success"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container fluid>
        <Navbar.Brand href="#home">
          <img
            alt=""
            src={logo}
            width="150"
            height="70"
            className="d-inline-block align-top"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action1">Ticket Booking</Nav.Link>
            <Nav.Link href="#action1">Contact Us</Nav.Link>
            <Nav.Link href="#action1">About Us</Nav.Link> */}
            
          </Nav>
          
          {/* Login Button */}
          <Button
            variant="light"
            className="border border-dark rounded-pill mx-2"
            style={{
              backgroundColor: "white",
              borderColor: "black",
            }}
          >
            Login
          </Button>
          {/* Signup Button */}
          <Button
            variant="light"
            className="border border-dark rounded-pill mx-2"
            style={{
              backgroundColor: "white",
              borderColor: "black",
            }}
          >
            Signup
          </Button>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LandningPageNav;
