import React, { useState, useEffect } from "react";
import { Row, Col, Button, ListGroup, Modal, Form } from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000/";

function TaskComponent({ task }) {
  const [employees, setEmployees] = useState([]);
  const [employeesOnTask, setEmployeesOnTask] = useState([]);
  const [employeesEligible, setEmployeesEligible] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const handleCloseAssignModal = () => setShowAssignModal(false);
  const handleShowAssignModal = () => setShowAssignModal(true);

  useEffect(() => {
    fetchAndFilter();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await fetch(BASE_URL + "employees/");
      const data = await response.json();
      setEmployees(data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

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

  const handleChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  const fetchAndFilter = () => {
    fetchEmployees();
    filterEmployees();
  }

  return (
    <Row className="my-5 align-items-center">
      <Col className="d-flex justify-content-center">
        <h4>{task.name}</h4>
      </Col>
      <Col className="d-flex justify-content-center">
        <div>{task.description}</div>
      </Col>
      <Col className="d-flex justify-content-center">
        <ListGroup>
          {employeesOnTask.map((employee) => (
            <ListGroup.Item key={employee.id}>{employee.name}</ListGroup.Item>
          ))}
        </ListGroup>
      </Col>
      <Col className="d-flex justify-content-center">
        <div className="assign-buttons d-flex flex-column align-items-center">
          <Button
            onClick={handleShowAssignModal}
            className="btn btn-primary mb-2"
          >
            Assign Employee
          </Button>
          <Modal
            show={showAssignModal}
            onHide={handleCloseAssignModal}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Assign Employee</Modal.Title>
            </Modal.Header>
            <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
              <Form.Select onFocus={fetchAndFilter} /* onChange={} */>
                <option disabled value="">
                  Select an employee
                </option>
                {employeesEligible.map((employee) => (
                  <option key={employee.id} value={employee}>
                    {employee.name}
                  </option>
                ))}
              </Form.Select>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseAssignModal}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
          <Button className="btn btn-secondary">Remove Employee</Button>
        </div>
      </Col>
    </Row>
  );
}

export default TaskComponent;
