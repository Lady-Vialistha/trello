import React, { useState } from "react";
import "./App.css";
import ToDoList from "./Component/ToDoList";
import { v4 as uuidv4 } from "uuid";
import Board from "./Component/Board";
function App() {
  return (
    <div className="App">
      <section>
        <ToDoList />
        <Board />
      </section>
    </div>
  );
}

export default App;
