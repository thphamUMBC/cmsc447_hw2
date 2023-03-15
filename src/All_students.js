import React from "react";
import { useQuery } from "@tanstack/react-query";
import { get_all_students } from "./API/api_call";

function All_students(props) {
  const { data, isLoading, isError, isSuccess } = useQuery(["students"], () =>
    get_all_students()
  );

  const list_students = (students) => {
    return students?.map((student) => (
      <div key={student.id}>
        {" "}
        {student.name}: {student.point}:{student.id}{" "}
      </div>
    ));
  };
  return (
    <div>
      {isLoading && <div>Getting students.</div>}
      {isError && <div>ERROR Getting students, message: {data?.status}</div>}
      {isSuccess && data?.status === undefined && list_students(data)}

      {isSuccess && data?.status !== undefined && (
        <div>No Students-- {data?.status}</div>
      )}
    </div>
  );
}

export default All_students;
