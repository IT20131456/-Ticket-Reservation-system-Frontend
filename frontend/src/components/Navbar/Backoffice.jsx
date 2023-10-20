import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../../images/logo.png";

function Backoffice() {

  const handleLogout = () => {
    // clearing session data.
    localStorage.removeItem('sessionData');
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('userType');
    // Redirect to the login page or perform other logout actions.
    window.location.href = "http://localhost:3000/employee/login"; // Redirect to the login page
  };

  return (
    <Navbar
      bg="light"
      data-bs-theme=""
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
            <Nav.Link href="#action1">Home</Nav.Link>

            <Nav.Link href="/traveler">Travelers</Nav.Link>
        
           

            <Nav.Link href="/trainschedule/view">Train Schedule</Nav.Link>
            <Nav.Link href="/usermanagement">Users</Nav.Link>
            
            
          </Nav>
          <Form className="d-flex" style={{ marginRight: "65px" }}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="primary">Search</Button>
          </Form>
          <label>BackOffice</label>&nbsp;&nbsp;
          <Form className="d-flex">
            <img
              alt=""
              src="img/undraw_profile.svg"
              width="40"
              height="40"
              className="d-inline-block "
            />
            &nbsp;&nbsp;
          </Form>

          <Button variant="outline-primary" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Backoffice;
