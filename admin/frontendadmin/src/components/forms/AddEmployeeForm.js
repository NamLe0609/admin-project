import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../getCookie.js";

import { Button, Form, Row, Col, InputGroup, Alert } from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000/";
const CSRFTOKEN = getCookie("csrftoken");
const adminInfo = JSON.parse(window.sessionStorage.getItem("admin"));

function AddEmployeeForm({ roles, onFormSubmit }) {
  const [registerData, setRegisterData] = useState({
    name: "",
    task: "Unassigned",
    role: "Unassigned",
    supervisor: adminInfo.username,
  });

  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);
  const [showRegisterFail, setShowRegisterFail] = useState(false);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRoleChange = (e) => {
    registerData.role = e.target.value;
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    let success;
    console.log(registerData);
    try {
      const response = await axios.post(BASE_URL + "employees/", registerData, {
        headers: {
          "X-CSRFToken": CSRFTOKEN,
          "Content-Type": "application/json",
        },
      });
      success = response.data;
    } catch (error) {
      console.log(error);
    }
    if (success) {
      setShowRegisterSuccess(true);
    } else {
      setShowRegisterFail(true);
    }
    setRegisterData({
      name: "",
      task: "Unassigned",
      role: "Unassigned",
      supervisor: adminInfo.username,
    });
    event.target.reset();
    onFormSubmit();
  };

  return (
    <>
      <Form onSubmit={handleSubmitRegister}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationNameReg">
            <Form.Label>Name</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Name"
                aria-describedby="inputGroupPrepend"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                required
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationTask">
            <Form.Label>Select a role</Form.Label>
            <select className="w-100" multiple onChange={handleRoleChange}>
              <option disabled value="">
                Select a role
              </option>
              {roles.map((role) => (
                <option key={role.name} value={role.name}>
                  {role.name}
                </option>
              ))}
            </select>
          </Form.Group>
        </Row>
        <Button className="mb-2" type="submit">
          Add
        </Button>
      </Form>
      {showRegisterFail && (
        <Alert
          variant="danger"
          onClose={() => setShowRegisterFail(false)}
          dismissible
        >
          Uh oh, something went horribly wrong!
        </Alert>
      )}
      {showRegisterSuccess && (
        <Alert
          variant="success"
          onClose={() => setShowRegisterSuccess(false)}
          dismissible
        >
          Employee successfully added!
        </Alert>
      )}
    </>
  );
}

export default AddEmployeeForm;
