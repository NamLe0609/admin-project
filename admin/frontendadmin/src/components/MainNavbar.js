import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const MainNavbar = () => {
  const handleClick = () => {
    // Handle the cases here
  }
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          <Nav.Link onClick={handleClick}>Add Employees</Nav.Link>
          <Nav.Link onClick={handleClick}>Remove Employees</Nav.Link>
          <Nav.Link onClick={handleClick}>Create Role</Nav.Link>
          <Nav.Link onClick={handleClick}>Remove Role</Nav.Link>
          <Nav.Link onClick={handleClick}>Create Task</Nav.Link>
          <Nav.Link onClick={handleClick}>Remove Remove</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MainNavbar;