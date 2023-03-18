import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  get_all_students,
  delete_student,
  update_student_id,
} from "./API/api_call";
import {
  Button,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Row,
} from "react-bootstrap";
import { useMutation } from "@tanstack/react-query";
function Update() {
  const get_students = useQuery(["students"], () => get_all_students());
  const [student, setStudent] = useState({ name: "", id: -1, point: 0 });
  const [id, setId] = useState(0);
  const [ddTitle, setDdTtitle] = useState("Select student(name-point-id)");
  console.log("render");
  const handleDelete_mutation = useMutation({
    mutationFn: (id) => {
      return delete_student(id);
    },
  });
  const handleUpdate_mutation = useMutation({
    mutationFn: (student) => {
      return update_student_id(student);
    },
  });
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(event.target);
    console.log(student);
    handleUpdate_mutation.mutateAsync(student);
    console.log(handleUpdate_mutation.data);
    get_students.refetch();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    handleDelete_mutation.mutateAsync(id);
  };
  const handleDropDownClick = (value) => {
    console.log(value);
    setDdTtitle(JSON.parse(value).name);
    setId(JSON.parse(value).id);
    setStudent(JSON.parse(value));
  };
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
  const list_students = (students) => {
    return (
      <Dropdown>
        <DropdownButton onSelect={handleDropDownClick} title={ddTitle}>
          {students?.map((student) => (
            <Dropdown.Item eventKey={JSON.stringify(student)} key={student.id}>
              {student.name}-{student.point}-{student.id}
            </Dropdown.Item>
          ))}
        </DropdownButton>
      </Dropdown>
    );
  };
  return (
    <Container className="d-flex flex-column gap-3">
      <Row className="align-self-center bg-dark bg-opacity-50 rounded-1">
        <div className="fw-bold fs-2 text-light">Update:</div>
      </Row>
      <Row>
        <Col className="d-flex justify-content-center">
          <Row>
            {get_students.isLoading && <Row>Getting students.</Row>}
            {get_students.isError && (
              <Row>
                ERROR Getting students, message: {get_students.data?.status}
              </Row>
            )}
            {get_students.isSuccess &&
              get_students.data?.status === undefined &&
              list_students(get_students.data)}

            {get_students.isSuccess &&
              get_students.data?.status !== undefined && (
                <Row>No Students-- {get_students.data?.status}</Row>
              )}
          </Row>
        </Col>

        <Col className="d-flex flex-column justify-content-center align-items-center">
          {/* Update section */}
          <Row className="d-flex flex-column justify-content-center align-items-center mb-2">
            <form onSubmit={handleUpdate} className="d-flex flex-column">
              <label className="bg-dark bg-opacity-10 w-auto black bold rounded-2 mb-2 py-2 align-self-start">
                {" "}
                Student's name:
              </label>
              <input
                type="text"
                required
                value={student.name}
                // defaultValue={student.name}
                placeholder={student.name}
                name="name"
                onChange={handleNameChange}
                className="mb-2 form-control"
              />
              <label className="bg-dark bg-opacity-10 w-auto black bold rounded-2 mb-2 py-2 align-self-start">
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
                type={"submit"}
                className="btn btn-warning  my-auto align-self-center"
                value="Update"
              />
            </form>
          </Row>

          {/* Delete section */}
          <Row>
            <Button onClick={handleDelete} className="btn btn-danger">
              Delete
            </Button>
          </Row>
          {/* Message for actions section */}
          <Row className="mt-4">
            {handleDelete_mutation.isLoading && (
              <div className="alert alert-info">Deleting Student</div>
            )}
            {handleDelete_mutation.isError && (
              <div className="alert alert-danger">
                Error: {handleDelete_mutation.error.message}
              </div>
            )}
            {handleDelete_mutation.isSuccess && (
              <div className="alert alert-success">
                Complete deletion with message:{" "}
                {JSON.stringify(handleDelete_mutation.data?.status)}
              </div>
            )}
            {handleUpdate_mutation.isLoading && (
              <div className="alert alert-info">Updating Student</div>
            )}
            {handleUpdate_mutation.isError && (
                <div className="alert alert-danger">
                  Error: {handleUpdate_mutation.error.message}
                </div>
              ) && <br></br>}
            {handleUpdate_mutation.isSuccess && (
              <div className="alert alert-success">
                Complete Updating with message:{" "}
                {JSON.stringify(handleUpdate_mutation.data?.status)}
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Update;
