import React, { useState, useEffect } from "react";
import "./App.css";
import ToDoList from "./Component/ToDoList";
import { v4 as uuidv4 } from "uuid";
import Board from "./Component/Board";
import { onSnapshot, collection, getDocs, addDoc } from "firebase/firestore";
import db from "../src/Config/FirebaseConfig";
function App() {
  const [task, setTask] = useState("");

  const itemsFromBackend = [{ id: uuidv4(), content: "example taskname" }];
  const columnsFromBackend = {
    open: {
      name: "Open Progress",
      items: itemsFromBackend,
    },
    inprogress: {
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
        open: {
          name: "Open Progress",
          items: [
            {
              id: uuidv4(),
              content: task,
            },
            ...prev.open.items,
          ],
        },
      };
    });
    setTask("");
  }

  useEffect(() => {
    onSnapshot(collection(db, "TrelloList"), (snap) => {
      const items = snap.docs.map((doc) => ({
        taskname: doc.taskname,
        ...doc.data(),
      }));
      console.log("map", items);
    });
  }, []);

  function handleOnDragEnd(res, col, setCol) {
    if (!res.destination) return;
    const { source, destination } = res;
    console.log("id", destination.droppableId);

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = col[source.droppableId];
      const destinationColumn = col[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destinationItems = [...destinationColumn.items];
      const [removed] = sourceItems.splice(res.source.index, 1);
      destinationItems.splice(res.destination.index, 0, removed);
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
      const [removed] = copiedItems.splice(res.source.index, 1);
      copiedItems.splice(res.destination.index, 0, removed);

      setCol({
        ...col,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
    console.log("state column", column);
    console.log("res", res);
    console.log("col", col);

    const getRef = getDocs(collection(db, "TrelloList"));
    if (getRef !== "") {
      addDoc(collection(db, "TrelloList"), {
        taskname: col.taskname,
      })
        .then(() => {
          console.log(col.taskname);
        })
        .catch((e) => {
          alert("Failed added to Firebase");
          console.log("Error failed", e);
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
