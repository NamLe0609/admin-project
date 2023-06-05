import React, { useState } from "react";
import "./App.css";
import Login from "./pages/login";
import MainPage from "./pages/mainPage"
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <Container>
      {isLoggedIn ? <MainPage/> : <Login onLoginSuccess={handleLoginSuccess}/>}
    </Container>
  );
}

export default App;
