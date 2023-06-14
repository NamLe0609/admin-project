import React from "react";

import { Nav, Navbar, Container } from "react-bootstrap";

import NavModalForm from "./forms/NavModalForm";
import NavDivider from "./NavDivider";
import AddEmployeeForm from "./forms/AddEmployeeForm.js";
import RemoveEmployeeForm from "./forms/RemoveEmployeeForm";
import AddRoleForm from "./forms/AddRoleForm";
import RemoveRoleForm from "./forms/RemoveRoleForm";
import UpdateRoleForm from "./forms/UpdateRoleForm";

function MainNavbar({ render }) {
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
                <AddEmployeeForm onFormSubmit={render}/>
              </NavModalForm>
              <NavModalForm formTitle="Remove Employees">
                <RemoveEmployeeForm onFormSubmit={render}/>
              </NavModalForm>
              <NavDivider />
              <NavModalForm formTitle="Add Role">
                <AddRoleForm />
              </NavModalForm>
              <NavModalForm formTitle="Remove Role">
                <RemoveRoleForm />
              </NavModalForm>
              <NavModalForm formTitle="Reassign Role">
                <UpdateRoleForm onFormSubmit={render}/>
              </NavModalForm>
              <NavDivider />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar;
