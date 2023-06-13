import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCookie } from "../getCookie.js";

import MainNavbar from "./MainNavbar.js";
import TaskComponent from "./TaskComponent.js";
import { Container, Row, Col, Button } from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000/";
const CSRFTOKEN = getCookie("csrftoken");
const adminInfo = JSON.parse(window.sessionStorage.getItem("admin"));

const MainPage = () => {
  // Todo

  // Implement ways to:
  // Assign/unassign employees to tasks (Interface with dropdown of employees applicable)
  // Make the tasks run in Celery?
  // Add ways to mass add all tasks to main page
  // Logout button? (not important)

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let response = await fetch(BASE_URL + "tasks/");
      let data = await response.json();
      const filteredTasks = data.filter(task => task.name !== "Unassigned");
      setTasks(filteredTasks);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <MainNavbar className="mw-100"/>
      </Row>
      {tasks.map(task => (
        <TaskComponent key={task.name} task={task}/>
      ))}
      <Row className="my-5 justify-content-center">
        <Col className="d-flex justify-content-center">
          <Button variant="success">Add Task</Button>
          <Button variant="danger" className="ms-2">
            Remove Task
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
