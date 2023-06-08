import React, { useState } from "react";
import "./App.css";
import Login from "./components/login";
import MainPage from "./components/mainPage"
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

// Todo

// Work in some kind of session-based authentication methods
// since I have more than one admin entity

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Container fluid className="px-0">
      {isLoggedIn ? <MainPage/> : <Login onLoginSuccess={handleLoginSuccess}/>}
    </Container>
  );
}

export default App;
