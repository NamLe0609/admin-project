import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../getCookie.js";

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/esm/Container";

const BASE_URL = "http://127.0.0.1:8000/";
const CSRFTOKEN = getCookie("csrftoken");

// Todo

// The onChange functions have a 1 character delay, 
// so maybe find a way to fix it later

const Login = (props) => {
  const [usernameLog, setUsernameLog] = useState("");
  const [passwordLog, setPasswordLog] = useState("");
  const [showLogin, setShowLogin] = useState(false);

  const [nameReg, setNameReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [showRegisterSuccess, setShowRegisterSuccess] = useState(false);
  const [showRegisterFail, setShowRegisterFail] = useState(false);

  const handleUsernameLogChange = (e) => {
    setUsernameLog(e.target.value);
  };

  const handlePasswordLogChange = (e) => {
    setPasswordLog(e.target.value);
  };

  const handleNameRegChange = (e) => {
    setNameReg(e.target.value);
  };

  const handleUsernameRegChange = (e) => {
    setUsernameReg(e.target.value);
  };

  const handlePasswordRegChange = (e) => {
    setPasswordReg(e.target.value);
  };

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    let matchedAdmin;
    try {
      const response = await fetch(BASE_URL + "admins/");
      console.log(response)
      const adminData = await response.json();
      matchedAdmin = adminData.find(
        (admin) =>
          admin.username === usernameLog && admin.password === passwordLog
      );
    } catch (error) {
      console.log(error);
    }
    console.log(matchedAdmin);
    if (matchedAdmin) {
      window.sessionStorage.setItem("user", JSON.stringify(matchedAdmin));
      props.onLoginSuccess();
    } else {
      setShowLogin(true);
    }

    setUsernameLog("");
    setPasswordLog("");
    event.target.reset();
  };

  const handleSubmitRegister = async (event) => {
    event.preventDefault();
    let success;
    const postData = {
      name: nameReg,
      username: usernameReg,
      password: passwordReg,
    };
    try {
      const response = await axios.post(BASE_URL + "admins/", postData, {
        headers: {
          "X-CSRFToken": CSRFTOKEN,
          "Content-Type": "application/json",
        },
      });
      success = response.data;
    } catch (error) {
      console.log(error);
    }
    setNameReg("");
    setUsernameReg("");
    setPasswordReg("");
    event.target.reset();

    if (success) {
      setShowRegisterSuccess(true);
    } else {
      setShowRegisterFail(true);
    }
  };

  return (
    <Container>
      <h1 className="mt-5">If you have an account:</h1>
      <Row className="mt-3">
        <Form onSubmit={handleSubmitLogin}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationUsernameLog">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  onChange={handleUsernameLogChange}
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
                  onChange={handlePasswordLogChange}
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
        {showLogin && (
          <Alert
            variant="danger"
            onClose={() => setShowLogin(false)}
            dismissible
          >
            Login failed!
          </Alert>
        )}
      </Row>

      <h1 className="mt-5">Otherwise, register:</h1>
      <Row className="mt-3">
        <Form onSubmit={handleSubmitRegister}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="validationNameReg">
              <Form.Label>Name</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Name"
                  aria-describedby="inputGroupPrepend"
                  onChange={handleNameRegChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please input a name
                </Form.Control.Feedback>
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
                  onChange={handleUsernameRegChange}
                  required
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
                  onChange={handlePasswordRegChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please input a password
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Button className="mb-2" type="submit">
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
      </Row>
    </Container>
  );
}

export default Login;
