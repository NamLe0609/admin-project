import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Row from "react-bootstrap/Row";
import Alert from "react-bootstrap/Alert";

function Login({ onLogin }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validated, setValidated] = useState(false);
  const [show, setShow] = useState(false);

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    event.preventDefault();
    event.stopPropagation();
    setValidated(true);

    // Perform login logic here
    // Send a request to your backend API with the entered username and password
    // Handle the response and update the login status accordingly
    // If login is successful, call `onLogin()` prop to trigger the login action in the parent component
    // Example login logic using hardcoded credentials
    if (username === "admin" && password === "password") {
      onLogin();
    } else {
      setShow(true);
    }

    // Clear input fields after form submission
    setUsername("");
    setPassword("");
  };

  return (
    <div>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationUsername">
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
          <Form.Group as={Col} md="4" controlId="validationPassword">
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
        
        <Button onClick={() => setShow(true)} type="submit">
          Submit form
        </Button>
      </Form>
      {show && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          Login failed!
        </Alert>
      )}
    </div>
  );
}

export default Login;
