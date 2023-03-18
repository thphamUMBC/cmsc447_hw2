import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { get_student_id } from "./API/api_call";
import { Row, Col, Container, Form, Button } from "react-bootstrap";

function Retrieve() {
  const [id, setId] = useState(0);
  const handleRetrieve_mutation = useMutation({
    mutationFn: (id) => {
      return get_student_id(id);
    },
  });
  const handleRetrieve = (event) => {
    event.preventDefault();
    handleRetrieve_mutation.mutateAsync(
      event.target.getElementsByTagName("input")[0].value
    );
  };

  const handleIdOnChange = (event) => {
    setId(event.target.value);
  };
  return (
    <Container className="d-flex flex-column gap-3">
      <Row className="align-self-center bg-dark rounded-1 bg-opacity-50">
        <div className="fw-bold fs-2 text-light">Retrieve:</div>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={handleRetrieve}>
            <Form.Group>
              <Form.Label
                htmlFor="id"
                className="bg-dark bg-opacity-10 black bold rounded-2 mb-2 p-2 align-self-start"
              >
                Enter student's ID:{" "}
              </Form.Label>
              <Form.Control
                required
                type="number"
                id="id"
                placeholder="Enter student ID"
                min={1}
                value={id}
                onChange={handleIdOnChange}
                className="mb-2 form-control"
              />
              <Button type="submit">Search</Button>
            </Form.Group>
          </Form>
        </Col>

        <Col>
          <div className="bg-dark bg-opacity-10 black bold rounded-2 mb-2 p-2 align-self-start w-auto">
            Result:
          </div>
          {handleRetrieve_mutation.isLoading && (
            <div className="alert alert-info">Retrieving Student</div>
          )}
          {handleRetrieve_mutation.isError && (
            <div className="alert alert-danger">
              Error: {handleRetrieve_mutation.error.message}
            </div>
          )}
          {handleRetrieve_mutation.isSuccess && (
            <div className="alert alert-success">
              Complete Retrieving with message:{" "}
              {JSON.stringify(handleRetrieve_mutation.data)}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Retrieve;
