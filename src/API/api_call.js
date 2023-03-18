const base_url = process.env.REACT_APP_LOCAL_HOST;

const get_all_students = () => {
  let url = base_url + "/students";
  return fetch(url, { method: "GET" })
    .then((res) => res.json())
    .catch((error) => error.response.header);
};

const get_student_id = (id) => {
  let url = base_url + `/students/id=${id}`;
  return fetch(url, { method: "GET" })
    .then((res) => res.json())
    .catch((error) => error.response);
};

const update_student_id = (student) => {
  let url = base_url + `/students/update`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  })
    .then((res) => res.json())
    .catch((error) => error.response);
};

const insert_student = (student) => {
  let url = base_url + `/students/insert`;
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  })
    .then((res) => res.json())
    .catch((error) => error.response);
};

const delete_student = (id) => {
  let url = base_url + `/students/delete/id=${id}`;
  return fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .catch((error) => error.response);
};

export { get_all_students, get_student_id, update_student_id, insert_student, delete_student };
