import React from "react";

import {
  Nav,
  Navbar,
  Container,
} from "react-bootstrap";

import NavModalForm from "./forms/NavModalForm";
import NavDivider from "./NavDivider";
import AddEmployeeForm from "./forms/AddEmployeeForm.js";
import RemoveEmployeeForm from "./forms/RemoveEmployeeForm";
import AddRoleForm from "./forms/AddRoleForm";
import RemoveRoleForm from "./forms/RemoveRoleForm";
import AddTaskForm from "./forms/AddTaskForm";
import RemoveTaskForm from "./forms/RemoveTaskForm";
import UpdateRoleForm from "./forms/UpdateRoleForm";

const MainNavbar = () => {
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
              <NavModalForm formTitle="Remove Role">
                <RemoveRoleForm/>
              </NavModalForm>
              <NavModalForm formTitle="Reassign Role">
                <UpdateRoleForm/>
              </NavModalForm>
              <NavDivider />
              <NavModalForm formTitle="Add Task">
                <AddTaskForm/>
              </NavModalForm>
              <NavModalForm formTitle="Remove Task">
                <RemoveTaskForm/>
              </NavModalForm>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default MainNavbar;
