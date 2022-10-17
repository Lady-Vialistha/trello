import React, { useState } from "react";
import "./App.css";
import ToDoList from "./Component/ToDoList";
import { v4 as uuidv4 } from "uuid";
import Board from "./Component/Board";
function App() {
  const [task, setTask] = useState("");

  const itemsFromBackend = [{ id: uuidv4(), content: "tatyusk" }];
  const columnsFromBackend = {
    todo: {
      name: "Open Progress",
      items: itemsFromBackend,
    },
    "in-progress": {
      name: "In Progress",
      items: [],
    },
    done: {
      name: "Done Progress",
      items: [],
    },
  };
  const [column, setColumn] = useState(columnsFromBackend);
  function handleButtonTask() {
    setColumn((prev) => {
      return {
        ...prev,
        todo: {
          name: "Open Progress",
          items: [
            {
              id: uuidv4(),
              content: task,
            },
            ...prev.todo.items,
          ],
        },
      };
    });
    setTask("");
  }

  function handleOnDragEnd(res, col, setCol) {
    if (!res.destination) return;
    const { source, destination } = res;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = col[source.droppableId];
      const destinationColumn = col[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destinationItems = [...destinationColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destinationItems.splice(destination.index, 0, removed);
      setCol({
        ...col,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destinationColumn,
          items: destinationItems,
        },
      });
    } else {
      const column = col[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setCol({
        ...col,
        [source.droppableId]: {
          ...col,
          items: copiedItems,
        },
      });
    }
  }
  return (
    <div className="App">
      <section>
        <ToDoList
          handleButtonTask={handleButtonTask}
          setTask={setTask}
          task={task}
        />
        <Board
          column={column}
          setColumn={setColumn}
          handleOnDragEnd={handleOnDragEnd}
        />
      </section>
    </div>
  );
}

export default App;
