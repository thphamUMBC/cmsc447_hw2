import React from "react";
import { delete_student } from "./API/api_call";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
function Delete_student() {
  const [id, setId] = useState(0);
  const handleDelete_mutation = useMutation({
    mutationFn: (id) => {
      return delete_student(id);
    },
  });
  const handleIDChange = (event) => {
    setId(event.target.value);
  };
  const handleDelete = (event) => {
    event.preventDefault();
    console.log(event.target);
    console.log(id);
    // const res = update_student_id(event.target)
    handleDelete_mutation.mutateAsync(id);
  };
  return (
    <>
      <label>
        id:
        <input
          type="number"
          min={0}
          required
          value={id}
          name="id"
          onChange={handleIDChange}
        />
      </label>
      <button onClick={handleDelete}>Delete</button>

      {handleDelete_mutation.isLoading && <div>Deleting Student</div> && (
        <br></br>
      )}
      {handleDelete_mutation.isError && (
          <div>Error: {handleDelete_mutation.error.message}</div>
        ) && <br></br>}
      {handleDelete_mutation.isSuccess && (
        <>
          <div>
            Complete deletion with message:{" "}
            {JSON.stringify(handleDelete_mutation.data?.status)}
          </div>
          <br></br>
        </>
      )}
    </>
  );
}

export default Delete_student;
