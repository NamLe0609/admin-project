import React, { useState, useEffect } from "react";

import MainNavbar from "./MainNavbar.js";
import TaskComponent from "./TaskComponent.js";
import { Container, Row, Col } from "react-bootstrap";
import ModalForm from "./forms/ModalForm.js";
import AddTaskForm from "./forms/AddTaskForm.js";
import RemoveTaskForm from "./forms/RemoveTaskForm.js";

const BASE_URL = "http://127.0.0.1:8000/";

const MainPage = () => {
  // Todo

  // Implement ways to:
  //
  // Make the tasks run in Celery?
  // Logout button? (not important)

  const [employees, setEmployees] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [update, setUpdate] = useState(null);

  useEffect(() => {
    fetchTasks();
    fetchEmployees();
    setUpdate(null);
  }, [update]);

  const fetchTasks = async () => {
    try {
      let response = await fetch(BASE_URL + "tasks/");
      let data = await response.json();
      const filteredTasks = data.filter((task) => task.name !== "Unassigned");
      setTasks(filteredTasks);
    } catch (error) {
      console.error(error);
    }
  };

  const render = () => {
    setUpdate(true);
  };

  const fetchEmployees = async () => {
    try {
      const response = await fetch(BASE_URL + "employees/");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <MainNavbar render={render} className="mw-100" />
      </Row>
      {tasks.map((task) => (
        <TaskComponent
          key={task.name}
          employees={employees}
          task={task}
          render={render}
        />
      ))}
      <Row className="my-5 justify-content-center">
        <Col className="d-flex justify-content-center">
          <ModalForm formTitle="Add Task" buttonType="success" className="mx-1">
            <AddTaskForm onFormSubmit={render} />
          </ModalForm>
          <ModalForm
            formTitle="Remove Task"
            buttonType="danger"
            className="mx-1"
          >
            <RemoveTaskForm onFormSubmit={render} />
          </ModalForm>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
