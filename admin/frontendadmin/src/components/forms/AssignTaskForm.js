import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../getCookie.js";

import { Button, Form, Row, Col, InputGroup, Alert } from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000/";
const CSRFTOKEN = getCookie("csrftoken");

function AssignTaskForm({ task, employeesEligible }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);


  const handleChange = (e) => {
    setSelectedEmployee(e.target.value);
  };

  /* const handleSubmitRegister = async (event) => {
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
  }; */

  return (
    <>
      <Form>
        <select className="w-100" multiple onChange={handleChange}>
          <option disabled value="">
            Select an employee
          </option>
          {employeesEligible.map((employee) => (
            <option key={employee.id} value={employee}>
              {employee.name}
            </option>
          ))}
        </select>
        <Button className="my-2" type="submit">
          Assign
        </Button>
      </Form>
      {showFail && (
        <Alert variant="danger" onClose={() => setShowSuccess(false)} dismissible>
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

export default AssignTaskForm;
