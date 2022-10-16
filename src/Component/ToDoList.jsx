import React, { useState } from "react";
import { Container, Button, Input } from "reactstrap";
import "../App.css";

function ToDoList({ task, setTask = () => {}, handleButtonTask = () => {} }) {
  return (
    <Container>
      <h1 className="text-white">Trello Task</h1>
      <div className="d-flex mt-5 mb-5 align-items-center justify-content-center">
        <Input
          placeholder="Your Task"
          value={task}
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
    </Container>
  );
}
export default ToDoList;
