import React from "react";

import {
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";

import NavModalForm from "./forms/navModalForm";
import NavDivider from "./navDivider";
import AddEmployeeForm from "./forms/AddEmployeeForm.js";
import RemoveEmployeeForm from "./forms/RemoveEmployeeForm";
import AddRoleForm from "./forms/AddRoleForm";

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
              <NavModalForm formTitle="Add Employees">
                <AddEmployeeForm/>
              </NavModalForm>
              <NavModalForm formTitle="Remove Employees">
                <RemoveEmployeeForm/>
              </NavModalForm>
              <NavDivider />
              <NavModalForm formTitle="Add Role">
                <AddRoleForm/>
              </NavModalForm>
              <Nav.Link eventKey="removeRole">
                Remove Role
              </Nav.Link>
              <Nav.Link eventKey="reassignRole">
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
