import React, { useState, useEffect } from "react";
import { getCookie } from "../getCookie";

import { Nav, Navbar, Container } from "react-bootstrap";

import NavModalForm from "./forms/NavModalForm";
import NavDivider from "./NavDivider";
import AddEmployeeForm from "./forms/AddEmployeeForm.js";
import RemoveEmployeeForm from "./forms/RemoveEmployeeForm";
import AddRoleForm from "./forms/AddRoleForm";
import RemoveRoleForm from "./forms/RemoveRoleForm";
import UpdateRoleForm from "./forms/UpdateRoleForm";

const BASE_URL = "http://127.0.0.1:8000/";

function MainNavbar({ employees, render }) {
  const [roles, setRoles] = useState([]);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    const fetchRoles = async () => {
    try {
      let response = await fetch(BASE_URL + "roles/");
      let data = await response.json();
      setRoles(data);
    } catch (error) {
      console.error(error);
    }
  };

    fetchRoles();
    setUpdate(null);
  }, [update])

  
  const refreshRoles = () => {
    setUpdate(true);
  }


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
                <AddEmployeeForm roles={roles} onFormSubmit={render}/>
              </NavModalForm>
              <NavModalForm formTitle="Remove Employees">
                <RemoveEmployeeForm employees={employees} onFormSubmit={render}/>
              </NavModalForm>
              <NavDivider />
              <NavModalForm formTitle="Add Role">
                <AddRoleForm onFormSubmit={refreshRoles}/>
              </NavModalForm>
              <NavModalForm formTitle="Remove Role">
                <RemoveRoleForm roles={roles} onFormSubmit={refreshRoles}/>
              </NavModalForm>
              <NavModalForm formTitle="Reassign Role">
                <UpdateRoleForm employees={employees} onFormSubmit={render}/>
              </NavModalForm>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar;
