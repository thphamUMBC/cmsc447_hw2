import "./App.css";
import All_students from "./All_students";
import Student from "./Student";
import Update_student from "./Update_student";
import Insert_student from "./Insert_student";
import Delete_student from "./Delete_student";
import { useState } from "react";


function App() {
  // const triggerFetching = () => {
  //   setFetching(false);
  // };
  const [id, setId] = useState(0);
  return (
    <div className="App">
      <All_students />
      <Update_student />
      <Insert_student />
      <Delete_student />
      <Student id={122} />
    </div>
  );
}

export default App;
