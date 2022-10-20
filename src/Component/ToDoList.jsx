import React, { useState, useContext } from "react";
import { Container, Button, Input } from "reactstrap";
import "../App.css";
import { CreateContext } from "../App";

function ToDoList() {
  const taskname = useContext(CreateContext).taskname;
  const setTaskName = useContext(CreateContext).setTaskName;
  const handleButtonTask = useContext(CreateContext).handleButtonTask;
  return (
    <Container>
      <h1 className="text-white">Trello Task</h1>
      <div className="d-flex mt-5 mb-5 align-items-center justify-content-center">
        <Input
          placeholder="Your Task"
          value={taskname}
          onChange={(e) => setTaskName(e.target.value)}
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
