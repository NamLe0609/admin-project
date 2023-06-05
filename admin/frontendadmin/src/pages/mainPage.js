import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../getCookie.js";

const BASE_URL = "http://127.0.0.1:8000/";
const CSRFTOKEN = getCookie("csrftoken");

const MainPage = () => {

    const getUserInfo = (e) => {
        console.log(JSON.parse(window.sessionStorage.getItem("user")));
    }

    return (
      <div>
        <h1>Welcome to the Main Page</h1>
        <p>This is the content of the main page.</p>
        <p>You can add more elements and components here.</p>
        <button onClick={getUserInfo}>Click me</button>
      </div>
    );
  };
  
  export default MainPage;