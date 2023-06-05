import React, { useState } from "react";
/* import MainPage from "mainPage"; */

import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";
import Container from "react-bootstrap/esm/Container";

const BASE_URL = "http://127.0.0.1:8000/";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.target.reset();
    let matchedAdmin;
    try {
      const response = await fetch(BASE_URL + "admins");
      const adminData = await response.json();
      matchedAdmin = adminData.find(
        (admin) => admin.username === username && admin.password === password
      );
    } catch (error) {
      console.log(error);
    }
    if (matchedAdmin) {
      /* return <MainPage /> */
    } else {
      setShow(true);
    }
    setUsername("");
    setPassword("");
  };

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationUsername">
            <Form.Label>Username</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Username"
                aria-describedby="inputGroupPrepend"
                onChange={handleUsernameChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input a username
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="validationPassword">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="password"
                placeholder="Password"
                aria-describedby="inputGroupPrepend"
                onChange={handlePasswordChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input a password
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>

        <Button className="mb-2" type="submit">
          Submit form
        </Button>
      </Form>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          Login failed!
        </Alert>
      )}
    </Container>
  );
}

export default Login;
