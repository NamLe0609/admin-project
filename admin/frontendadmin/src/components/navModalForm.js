import React, { useState } from "react";
import { Modal, Button, Form, Nav } from "react-bootstrap";

const NavModalForm = ({ formTitle, onSubmit, children }) => {
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => setShowModal(false);
  const handleShowModal = () => setShowModal(true);

  const handleSubmit = () => {
    onSubmit();
    handleCloseModal();
  };

  return (
    <>
      <Nav.Link onClick={handleShowModal}>{formTitle}</Nav.Link>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>{formTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>{children}</Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NavModalForm;
