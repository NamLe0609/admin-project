import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../getCookie.js";

import MainNavbar from "./MainNavbar.js";
import TaskComponent from "./TaskComponent.js";
import { Container, Row } from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000/";
const CSRFTOKEN = getCookie("csrftoken");
const adminInfo = JSON.parse(window.sessionStorage.getItem("admin"));

const MainPage = () => {
  const getUserInfo = (e) => {
    console.log(JSON.parse(window.sessionStorage.getItem("user")));
  };

  // Todo

  // Implement ways to:
  // Assign/unassign employees to tasks (Interface with dropdown of employees applicable)
  // Make the tasks run in Celery?
  // Add ways to mass add all tasks to main page
  // Logout button? (not important)

  return (
    <Container fluid className="px-0">
      <Row>
        <MainNavbar />
      </Row>
      <TaskComponent/>
      <TaskComponent/>
    </Container>
  );
};

export default MainPage;
