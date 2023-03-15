import React, { useState } from "react";
import { update_student_id } from "./API/api_call";
import { useMutation } from "@tanstack/react-query";

function Update_student() {
  const [student, setStudent] = useState({ name: "", id: 0, point: 0 });
  const handleUpdate_mutation = useMutation({
    mutationFn: (student) => {
      return update_student_id(student);
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
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log(event.target);
    console.log(student);
    // const res = update_student_id(event.target)
    handleUpdate_mutation.mutateAsync(student);
    console.log(handleUpdate_mutation.data);
    // console.log(res.data);
  };
  return (
    <>
      <form onSubmit={handleUpdate} method="POST">
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
        <input type="submit" value="Update" />
      </form>
      <div>
        name: {student.name} id: {student.id} point: {student.point}
      </div>

      <br></br>

      {handleUpdate_mutation.isLoading && <div>Updating Student</div> && (
        <br></br>
      )}
      {handleUpdate_mutation.isError && (
          <div>Error: {handleUpdate_mutation.error.message}</div>
        ) && <br></br>}
      {handleUpdate_mutation.isSuccess && (
        <>
          <div>
            Complete Updating with message:{" "}
            {JSON.stringify(handleUpdate_mutation.data?.status)}
          </div>
          <br></br>
        </>
      )}
    </>
  );
}

export default Update_student;
