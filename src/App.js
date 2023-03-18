import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Retrieve from "./Retrieve";
import Insert from "./Insert";
import Update from "./Update.js";
import { Container } from "react-bootstrap";

function App() {
  return (
    <>
      <Container className="bg-light bg-opacity-50 w-75 p-5 border-light rounded-2 my-3">
        <Update />
        {/* <Insert />
      <Retrieve /> */}
      </Container>
      <Container className="bg-light bg-opacity-50 w-50 p-5 border-light rounded-2 my-3">
        {/* <Update /> */}
        <Insert />
        {/* <Retrieve /> */}
      </Container>
      <Container className="bg-light bg-opacity-50 w-75 p-5 border-light rounded-2 my-3">
        {/* <Update />
        <Insert /> */}
        <Retrieve />
      </Container>
    </>
  );
}

export default App;
