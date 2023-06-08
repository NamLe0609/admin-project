import React, { useState } from "react";

import { Button, Form, Row, Col, InputGroup, Alert } from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000/";

const LoginForm = ({ onLoginSuccess }) => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });
  const [showLoginError, setShowLoginError] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(BASE_URL + "admins/");
      const adminData = await response.json();
      const matchedAdmin = adminData.find(
        (admin) =>
          admin.username === loginData.username &&
          admin.password === loginData.password
      );
      if (matchedAdmin) {
        window.sessionStorage.setItem("admin", JSON.stringify(matchedAdmin));
        console.log("success!");
        onLoginSuccess();
      } else {
        setShowLoginError(true);
      }
    } catch (error) {
      console.log(error);
    }
    setLoginData({
      username: "",
      password: "",
    });
    event.target.reset();
  };

  return (
    <>
      <Form onSubmit={handleSubmitLogin}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationUsernameReg">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                name="username"
                value={loginData.username}
                onChange={handleLoginChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input a username
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationPasswordLog">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                placeholder="Password"
                aria-describedby="inputGroupPrepend"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input a password
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Button className="mb-2" type="submit">
          Login
        </Button>
      </Form>
      {showLoginError && (
        <Alert
          variant="danger"
          onClose={() => setShowLoginError(false)}
          dismissible
        >
          Login failed!
        </Alert>
      )}
    </>
  );
};

export default LoginForm;
