import React, { useState } from "react";
import axios from "axios";
import { getCookie } from "../../getCookie.js";

import { Button, Form, Row, Col, InputGroup, Alert } from "react-bootstrap";

const BASE_URL = "http://127.0.0.1:8000/";
const CSRFTOKEN = getCookie("csrftoken");

const AddRoleForm = () => {
  const [registerData, setRegisterData] = useState({
    name: "",
    description: "",
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
      const response = await axios.post(BASE_URL + "roles/", registerData, {
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
      description: "",
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
                required
              />
              <Form.Control.Feedback type="invalid">
                Please input a name
              </Form.Control.Feedback>
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Leave blank if not necessary"
              as="textarea"
              rows={3}
              aria-describedby="inputGroupPrepend"
              name="description"
              value={registerData.description}
              onChange={handleRegisterChange}
            />
          </Form.Group>
        </Row>
        <Button className="mb-2" type="submit">
          Add
        </Button>
      </Form>
      {showRegisterFail && (
        <Alert
          variant="danger"
          onClose={() => setShowRegisterFail(false)}
          dismissible
        >
          Uh oh, something went horribly wrong!
        </Alert>
      )}
      {showRegisterSuccess && (
        <Alert
          variant="success"
          onClose={() => setShowRegisterFail(false)}
          dismissible
        >
          Role successfully added!
        </Alert>
      )}
    </>
  );
};

export default AddRoleForm;
