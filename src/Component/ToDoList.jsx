import React, { useState, useEffect } from "react";
import { Container, Button, Input } from "reactstrap";
import "../App.css";

function ToDoList() {
  const [isToDo, setToDo] = useState([]);
  const [isTask, setTask] = useState("");

  function handleButtonTask() {
    setToDo([...isToDo, isTask]);
  }

  const printTask = isToDo.map((item, key) => {
    return (
      <ul key={key}>
        <li>{item}</li>
      </ul>
    );
  });

  return (
    <Container>
      <h1 className="text-white">Trello Task</h1>
      <div className="d-flex mt-5 mb-5 align-items-center justify-content-center">
        <Input
          placeholder="Your Task"
          value={isTask}
          onChange={(e) => setTask(e.target.value)}
          className="input-list border-transparent bg-transparent"
        />
        <Button
          color="info"
          outline
          onClick={() => handleButtonTask()}
          className="button-list"
        >
          Submit
        </Button>
      </div>
      {printTask}
    </Container>
  );
}
export default ToDoList;
