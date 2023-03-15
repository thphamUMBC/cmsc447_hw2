import React from "react";
import { insert_student } from "./API/api_call";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
function Insert_student() {
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
    <>
      <form onSubmit={handleInsert} method="POST">
        <label>
          Name
          <input
            type="text"
            required
            value={student.name}
            name="name"
            onChange={handleNameChange}
          />
        </label>
        <label>
          id:
          <input
            type="number"
            min={0}
            required
            value={student.id}
            name="id"
            onChange={handleIDChange}
          />
        </label>
        <label>
          Point:
          <input
            type="number"
            max={100}
            min={0}
            required
            value={student.point}
            name="point"
            onChange={handlePointChange}
          />
        </label>
        <input type="submit" value="Insert" />
      </form>
      <div>
        name: {student.name} id: {student.id} point: {student.point}
      </div>

      <br></br>

      {handleInsert_mutation.isLoading && <div>Inserting Student</div> && (
        <br></br>
      )}
      {handleInsert_mutation.isError && (
          <div>Error: {handleInsert_mutation.error.message}</div>
        ) && <br></br>}
      {handleInsert_mutation.isSuccess && (
        <>
          <div>
            Complete inserting with message:{" "}
            {JSON.stringify(handleInsert_mutation.data?.status)}
          </div>
          <br></br>
        </>
      )}
    </>
  );
}

export default Insert_student;
