import React from "react";

import { Row, Container } from "react-bootstrap";

import LoginForm from "./forms/LoginForm.js";
import RegisterForm from "./forms/RegisterForm.js";

// Todo

// The onChange functions have a 1 character delay,
// so maybe find a way to fix it later

const Login = (props) => {
  const handleLoginSuccess = () => {
    props.onLoginSuccess();
  };

  return (
    <Container>
      <h1 className="mt-5">If you have an account:</h1>
      <Row className="mt-3">
        <LoginForm onLoginSuccess={handleLoginSuccess}/>
      </Row>

      <h1 className="mt-5">Otherwise, register:</h1>
      <Row className="mt-3">
        <RegisterForm />
      </Row>
    </Container>
  );
};

export default Login;
