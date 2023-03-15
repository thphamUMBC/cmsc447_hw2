import React from "react";
import { useQuery } from "@tanstack/react-query";
import { get_student_id } from "./API/api_call";
function Student(props) {
  const { data, isLoading, isError, isSuccess } = useQuery(
    ["students", props.id],
    () => get_student_id(props.id)
  );
  return (
    <div>
      {isLoading && <div>Getting student with id: {props.id}</div>}
      {isError && (
        <div>
          ERROR Getting student with id: {props.id}, message: {data?.status}
        </div>
      )}
      {isSuccess && data?.status === undefined && (
        <div>
          Got student-- Name: {data?.name}, Point: {data?.point}
        </div>
      )}
      {isSuccess && data?.status !== undefined && (
        <div>No Student-- {data?.status}</div>
      )}
    </div>
  );
}

export default Student;
