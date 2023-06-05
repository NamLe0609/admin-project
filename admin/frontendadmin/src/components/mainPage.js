import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../getCookie.js";

import MainNavbar from "./MainNavbar.js";
import Container from "react-bootstrap/esm/Container.js";
import Row from "react-bootstrap/esm/Row.js";
import Col from "react-bootstrap/esm/Col.js";

const BASE_URL = "http://127.0.0.1:8000/";
const CSRFTOKEN = getCookie("csrftoken");

const MainPage = () => {

    const getUserInfo = (e) => {
        console.log(JSON.parse(window.sessionStorage.getItem("user")));
    }

    // Todo

    // Implement ways to:
    // Add/remove employees/tasks/roles (Navbar buttons)
    // Assign/unassign employees to tasks (Interface with dropdown of employees applicable)
    // Make the tasks run in Celery?
    // Add ways to mass add all tasks to main page
    // Logout button? (not important)

    return (
      <Container fluid className="px-0">
        <Row><MainNavbar/></Row>
        <Row className="my-5">
          <Col><div>Task</div></Col>
          <Col><div>Content of Task</div></Col>
          <Col><div>Assign employee to task</div></Col>
        </Row>
        <Row className="my-5">
          <Col><div>Task</div></Col>
          <Col><div>Content of Task</div></Col>
          <Col><div>Assign employee to task</div></Col>
        </Row>
        <Row className="my-5">
          <Col><div>Task</div></Col>
          <Col><div>Content of Task</div></Col>
          <Col><div>Assign employee to task</div></Col>
        </Row>
        <Row className="my-5">
          <Col><div>Task</div></Col>
          <Col><div>Content of Task</div></Col>
          <Col><div>Assign employee to task</div></Col>
        </Row>
      </Container>
    );
  };
  
  export default MainPage;