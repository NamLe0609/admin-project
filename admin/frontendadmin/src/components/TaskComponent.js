import React, { useState, useEffect } from "react";
import { Row, Col, ListGroup } from "react-bootstrap";
import ModalForm from "./forms/ModalForm";
import AssignTaskForm from "./forms/AssignTaskForm";
import UnassignTaskForm from "./forms/UnassignTaskForm";

function TaskComponent({ employees, task, render }) {
  const [employeesOnTask, setEmployeesOnTask] = useState([]);
  const [employeesEligible, setEmployeesEligible] = useState([]);

  useEffect(() => {
    const filterEmployees = () => {
      const employeesOnTask = employees.filter(
        (employee) => employee.task === task.name
      );
      setEmployeesOnTask(employeesOnTask);
      const employeesEligible = employees.filter(
        (employee) =>
          employee.role === task.role_requirement &&
          employee.task === "Unassigned"
      );
      setEmployeesEligible(employeesEligible);
    };

    filterEmployees();
  }, [employees, task]);

  return (
    <Row className="my-5 align-items-center">
      <Col className="d-flex justify-content-center">
        <h4>{task.name}</h4>
      </Col>
      <Col className="d-flex justify-content-center">
        {task.description.length === 0 ? (
          <div>No description</div>
        ) : (
          <div>{task.description}</div>
        )}
      </Col>
      <Col className="d-flex justify-content-center">
        <ListGroup
          variant="flush"
          style={{
            maxHeight: "120px",
            width: "200px",
            overflowY: "auto",
          }}
        >
          {employeesOnTask.length === 0 ? (
            <ListGroup.Item>No employees assigned</ListGroup.Item>
          ) : (
            employeesOnTask.map((employee) => (
              <ListGroup.Item key={employee.id}>{employee.name}</ListGroup.Item>
            ))
          )}
        </ListGroup>
      </Col>
      <Col className="d-flex justify-content-center">
        <div className="d-flex flex-column align-items-center">
          <ModalForm
            formTitle="Assign Employee"
            buttonType="primary"
            className="mb-2"
          >
            <AssignTaskForm
              task={task}
              employeesEligible={employeesEligible}
              onFormSubmit={render}
            />
          </ModalForm>
          <ModalForm formTitle="Unassign Employee" buttonType="secondary">
            <UnassignTaskForm
              employeesEligible={employeesOnTask}
              onFormSubmit={render}
            />
          </ModalForm>
        </div>
      </Col>
    </Row>
  );
}

export default TaskComponent;
