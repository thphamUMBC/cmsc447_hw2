import React from "react";
import { insert_student } from "./API/api_call";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Container, Row } from "react-bootstrap";
function Insert() {
  const [student, setStudent] = useState({ name: "", id: 0, point: 0 });
  const handleInsert_mutation = useMutation({
    mutationFn: (student) => {
      return insert_student(student);
    },
  });
  const handleNameChange = (event) => {
    let tmpStudent = { ...student };
    tmpStudent.name = event.target.value;
    setStudent(tmpStudent);
  };
  const handlePointChange = (event) => {
    const tmpStudent = { ...student };
    tmpStudent.point = event.target.value;
    setStudent(tmpStudent);
  };
  const handleIDChange = (event) => {
    const tmpStudent = { ...student };
    tmpStudent.id = event.target.value;
    setStudent(tmpStudent);
  };
  const handleInsert = (event) => {
    event.preventDefault();
    console.log(event.target);
    console.log(student);
    // const res = update_student_id(event.target)
    handleInsert_mutation.mutateAsync(student);
  };
  return (
    <Container className="d-flex flex-column gap-3">
      <Row className="align-self-center bg-dark rounded-1 bg-opacity-50">
        <div className="fw-bold fs-2 text-light">Insert:</div>
      </Row>
      <Row>
        <form
          className="d-flex flex-column flex-grow-0"
          onSubmit={handleInsert}
          method="POST"
        >
          <label
            htmlFor="name"
            className="bg-dark bg-opacity-10 black bold rounded-2 mb-2 p-2 align-self-start"
          >
            Name:
          </label>
          <input
            type="text"
            required
            value={student.name}
            name="name"
            onChange={handleNameChange}
            className="mb-2 form-control"
          />
          <label
            htmlFor="id"
            className="bg-dark bg-opacity-10 black bold rounded-2 mb-2 p-2 align-self-start"
          >
            id:
          </label>
          <input
            type="number"
            min={1}
            required
            value={student.id}
            name="id"
            onChange={handleIDChange}
            className="mb-2 form-control"
          />
          <label
            htmlFor="point"
            className="bg-dark bg-opacity-10 black bold rounded-2 mb-2 p-2 align-self-start"
          >
            Point:
          </label>
          <input
            type="number"
            max={100}
            min={0}
            required
            value={student.point}
            name="point"
            onChange={handlePointChange}
            className="mb-2 form-control"
          />
          <input
            type="submit"
            value="Insert"
            className="btn btn-primary w-50 align-self-center"
          />
        </form>
        {/* <div>
          name: {student.name} id: {student.id} point: {student.point}
        </div> */}
      </Row>

      <Row>
        {handleInsert_mutation.isLoading && (
          <div className="alert alert-info">Inserting Student</div>
        )}
        {handleInsert_mutation.isError && (
          <div className="alert alert-danger">
            Error: {handleInsert_mutation.error}
          </div>
        )}
        {handleInsert_mutation.isSuccess && (
          <div
            className={
              handleInsert_mutation.data?.status?.includes("ERROR")
                ? "alert alert-danger"
                : "alert alert-success"
            }
          >
            Complete inserting with message:{" "}
            {JSON.stringify(handleInsert_mutation.data?.status)}
          </div>
        )}
      </Row>
    </Container>
  );
}

export default Insert;
