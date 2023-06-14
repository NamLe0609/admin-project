import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../getCookie";

import { Button, Form, Row, Col, InputGroup, Alert } from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000/";
const CSRFTOKEN = getCookie("csrftoken");

const RegisterForm = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    username: "",
    password: "",
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

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    let success;
    console.log(registerData);
    try {
      const response = await axios.post(BASE_URL + "admins/", registerData, {
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
      username: "",
      password: "",
    });
    event.target.reset();
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
                disabled
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationUsernameReg">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                name="username"
                value={registerData.username}
                onChange={handleRegisterChange}
                disabled
              />
              <Form.Control.Feedback type="invalid">
                Please input a username
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationPasswordReg">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                placeholder="Password"
                aria-describedby="inputGroupPrepend"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                disabled
              />
              <Form.Control.Feedback type="invalid">
                Please input a password
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Button disabled className="mb-2" type="submit">
          Register
        </Button>
      </Form>
      {showRegisterFail && (
        <Alert
          variant="danger"
          onClose={() => setShowRegisterFail(false)}
          dismissible
        >
          Username taken! Please choose a different username.
        </Alert>
      )}
      {showRegisterSuccess && (
        <Alert
          variant="success"
          onClose={() => setShowRegisterFail(false)}
          dismissible
        >
          Account successfully created! Please log in.
        </Alert>
      )}
    </>
  );
};

export default RegisterForm;