import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../getCookie.js";

import { Button, Form, Row, Col, Alert } from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000/";
const CSRFTOKEN = getCookie("csrftoken");

function UpdateRoleForm({ onFormSubmit }) {
  const [employeeOptions, setEmployeeOptions] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [roleOptions, setRoleOptions] = useState([]);
  const [selectedRole, setSelectedRole] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const fetchEmployeeData = async () => {
    try {
      let response = await fetch(BASE_URL + "employees/");
      let data = await response.json();
      setEmployeeOptions(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRoleData = async () => {
    try {
      let response = await fetch(BASE_URL + "roles/");
      let data = await response.json();
      const role = data.filter((role) => role.name !== "Unassigned");
      setRoleOptions(role);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEmployeeChange = (e) => {
    let employeeId = e.target.value;
    employeeId = parseInt(e.target.value, 10);
    const employee = employeeOptions.find(
      (employee) => employee.id === employeeId
    );
    setSelectedEmployee(employee);
  };

  const handleRoleChange = (e) => {
    let role = e.target.value;
    setSelectedRole(role);
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    let success;
    selectedEmployee.role = selectedRole;
    const updatedEmployeeData = {
      name: selectedEmployee.name,
      task: selectedEmployee.task,
      role: selectedEmployee.role,
      supervisor: selectedEmployee.supervisor,
    };
    try {
      const response = await axios.put(
        `${BASE_URL}employees/${selectedEmployee.id}/`,
        updatedEmployeeData,
        {
          headers: {
            "X-CSRFToken": CSRFTOKEN,
            "Content-Type": "application/json",
          },
        }
      );
      success = response.data;
    } catch (error) {
      console.log(error);
    }
    if (success) {
      setShowSuccess(true);
    } else {
      setShowFail(true);
    }
    event.target.reset();
    onFormSubmit();
  };

  return (
    <>
      <Form onSubmit={handleSubmitRegister}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationEmployee">
            <Form.Label>Select an employee</Form.Label>
            <Form.Select
              onFocus={fetchEmployeeData}
              onChange={handleEmployeeChange}
            >
              <option disabled value="">
                Select an employee
              </option>
              {employeeOptions.map((employee) => (
                <option key={employee.id} value={employee.id}>
                  {employee.name}
                </option>
              ))}
            </Form.Select>
            {selectedEmployee && (
              <div className="mt-3">
                <p>Name: {selectedEmployee.name}</p>
                <p>Task: {selectedEmployee.task}</p>
                <p>Role: {selectedEmployee.role}</p>
                <p>Supervisor: {selectedEmployee.supervisor}</p>
              </div>
            )}
          </Form.Group>
        </Row>
        {selectedEmployee && (
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationRole">
              <Form.Label>Select a role</Form.Label>
              <Form.Select onFocus={fetchRoleData} onChange={handleRoleChange}>
                <option disabled value="">
                  Select a role
                </option>
                {roleOptions.map((role) => (
                  <option key={role.name} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Row>
        )}
        <Button className="mb-2" type="submit">
          Update
        </Button>
      </Form>
      {showFail && (
        <Alert variant="danger" onClose={() => setShowFail(false)} dismissible>
          Uh oh, something went horribly wrong!
        </Alert>
      )}
      {showSuccess && (
        <Alert variant="success" onClose={() => setShowFail(false)} dismissible>
          Information successfully updated!
        </Alert>
      )}
    </>
  );
}

export default UpdateRoleForm;
