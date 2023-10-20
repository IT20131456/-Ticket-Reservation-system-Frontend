import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../images/logo.png";
import swal from "sweetalert";

function LandningPageNav() {

  const handleSignupClick = () => {
    // Display SweetAlert message on signup button click
    swal("Choose Your Role", "Sign Up as a Travel Agent or Back Office Staff?",  {
      buttons: {
        redirectEmployee: {
          text: "Travel Agent",
          value: "travelagent",
        },
        redirectTravelAgent: {
          text: "Back Office",
          value: "backoffice",
        },
      },
    }).then((value) => {
      // Redirect based on the button clicked
      switch (value) {
        case "travelagent":
          window.location.href = "/travelagent/registration";
          break;
        case "backoffice":
          window.location.href = "/backoffice/registration";
          break;
        default:
          // Handle other cases if needed
          break;
      }
    });
  };

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
            onClick={() => {
              window.location.href = "/employee/login";
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
            onClick={handleSignupClick}
          >
            Signup
          </Button>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default LandningPageNav;
