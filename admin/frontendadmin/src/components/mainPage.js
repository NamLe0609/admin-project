import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../getCookie.js";

import MainNavbar from "./MainNavbar.js";
import Container from "react-bootstrap/esm/Container.js";

const BASE_URL = "http://127.0.0.1:8000/";
const CSRFTOKEN = getCookie("csrftoken");

const MainPage = () => {

    const getUserInfo = (e) => {
        console.log(JSON.parse(window.sessionStorage.getItem("user")));
    }

    return (
      <Container fluid className="px-0">
        <MainNavbar/>
      </Container>
    );
  };
  
  export default MainPage;