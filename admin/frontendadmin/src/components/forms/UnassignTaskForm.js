import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../getCookie.js";

import { Button, Form, Alert } from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000/";
const CSRFTOKEN = getCookie("csrftoken");

function UnassignTaskForm({ employeesEligible, onFormSubmit }) {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const [showSuccess, setShowSuccess] = useState(false);
  const [showFail, setShowFail] = useState(false);

  const handleChange = (e) => {
    setSelectedEmployee(JSON.parse(e.target.value));
  };

  const handleSubmitAssign = async (event) => {
    event.preventDefault();
    let success;
    const updatedEmployeeData = {
      name: selectedEmployee.name,
      task: 'Unassigned',
      role: selectedEmployee.role,
      supervisor: selectedEmployee.supervisor,
    };
    console.log(updatedEmployeeData);
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
      <Form onSubmit={handleSubmitAssign}>
        <select className="w-100" multiple onChange={handleChange}>
          <option disabled value="">
            Select an employee
          </option>
          {employeesEligible.map((employee) => (
            <option key={employee.id} value={JSON.stringify(employee)}>
              {employee.name}
            </option>
          ))}
        </select>
        <Button className="my-2" type="submit">
          Assign
        </Button>
      </Form>
      {showFail && (
        <Alert variant="danger" onClose={() => setShowFail(false)} dismissible>
          Uh oh, something went horribly wrong!
        </Alert>
      )}
      {showSuccess && (
        <Alert
          variant="success"
          onClose={() => setShowSuccess(false)}
          dismissible
        >
          Employee successfully unassigned!
        </Alert>
      )}
    </>
  );
}

export default UnassignTaskForm;
