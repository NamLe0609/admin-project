import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import ModalForm from "./forms/ModalForm";
import AssignTaskForm from "./forms/AssignTaskForm";

const BASE_URL = "http://127.0.0.1:8000/";

function TaskComponent({ task }) {
  const [employees, setEmployees] = useState([]);
  const [employeesOnTask, setEmployeesOnTask] = useState([]);
  const [employeesEligible, setEmployeesEligible] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    const filterEmployees = () => {
      const employeesOnTask = employees.filter(
        (employee) => employee.task === task.name
      );
      setEmployeesOnTask(employeesOnTask);
      const employeesEligible = employees.filter(
        (employee) => employee.role === task.role_requirement
      );
      setEmployeesEligible(employeesEligible);
    };

    filterEmployees();
  }, [employees, task]);

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
    <Row className="my-5 align-items-center">
      <Col className="d-flex justify-content-center">
        <h4>{task.name}</h4>
      </Col>
      <Col className="d-flex justify-content-center">
        <div>{task.description}</div>
      </Col>
      <Col className="d-flex justify-content-center">
        <ListGroup
          variant="flush"
          style={{
            maxHeight: "200px",
            overflowY: "auto",
            scrollbarWidth: "none" /* Hide scrollbar for Firefox */,
            "msOverflowStyle": "none" /* Hide scrollbar for IE and Edge */,
            "&::WebkitScrollbar": {
              display:
                "none" /* Hide scrollbar for Chrome, Safari, and Opera */,
            },
          }}
        >
          {employeesEligible.map((employee) => (
            <ListGroup.Item key={employee.id}>{employee.name}</ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col className="d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <ModalForm
            formTitle="Assign Employee"
            buttonType="primary"
            className="mb-2"
          >
            <AssignTaskForm task={task} employeesEligible={employeesEligible} />
          </ModalForm>
          <ModalForm
            formTitle="Remove Employee"
            buttonType="secondary"
          ></ModalForm>
        </div>
      </Col>
    </Row>
  );
}

export default TaskComponent;
