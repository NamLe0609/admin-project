import React from 'react';
import { Row, Col, Button } from 'react-bootstrap';

const TaskComponent = () => {
  return (
    <Row className="my-5 align-items-center">
      <Col className="d-flex justify-content-center">
        <h4>Task</h4>
      </Col>
      <Col className="d-flex justify-content-center">
        <div>
          Content of Task
        </div>
      </Col>
      <Col className="d-flex justify-content-center">
        <div>
          Currently assigned
        </div>
      </Col>
      <Col className="d-flex justify-content-center">
        <div className="assign-buttons d-flex flex-column align-items-center">
          <Button className="btn btn-primary mb-2">Assign Employee</Button>
          <Button className="btn btn-secondary">Remove Employee</Button>
        </div>
      </Col>
    </Row>
  );
};

export default TaskComponent;