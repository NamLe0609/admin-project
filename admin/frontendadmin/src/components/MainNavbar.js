import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavModalForm from "./navModalForm";
import NavDivider from "./navDivider";

const MainNavbar = () => {
  const handleClick = () => {};

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand>Administrative Website</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <NavDivider />
            <Nav className="me-auto">
              <NavModalForm
                formTitle="Add Employees"
                onSubmit={handleClick}
              ></NavModalForm>
              <Nav.Link eventKey="removeEmployee" onClick={handleClick}>
                Remove Employees
              </Nav.Link>
              <NavDivider />
              <Nav.Link eventKey="addRole" onClick={handleClick}>
                Create Role
              </Nav.Link>
              <Nav.Link eventKey="removeRole" onClick={handleClick}>
                Remove Role
              </Nav.Link>
              <Nav.Link eventKey="reassignRole" onClick={handleClick}>
                Reassign Role
              </Nav.Link>
              <NavDivider />
              <Nav.Link eventKey="addTask" onClick={handleClick}>
                Create Task
              </Nav.Link>
              <Nav.Link eventKey="removeTask" onClick={handleClick}>
                Remove task
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MainNavbar;