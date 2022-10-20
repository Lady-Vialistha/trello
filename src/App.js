import React, { useState, useEffect, useContext, createContext } from "react";
import "./App.css";
import ToDoList from "./Component/ToDoList";
import { v4 as uuidv4 } from "uuid";
import Board from "./Component/Board";
import { onSnapshot, collection, getDocs, addDoc } from "firebase/firestore";
import db from "../src/Config/FirebaseConfig";

export const CreateContext = createContext();

function App(props) {
  const [taskname, setTaskName] = useState("");
  const [arr, setArr] = useState([]);
  const itemsFromBackend = [{ id: uuidv4(), content: "dfssdfdfdg" }];
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
  console.log(column, "coilumn");
  console.log(column, "column");
  function handleButtonTask() {
    setColumn((prev) => {
      return {
        ...prev,
        open: {
          name: "Open Progress",
          items: [
            {
              id: uuidv4(),
              content: taskname,
            },
            ...prev.open.items,
          ],
        },
      };
    });
    const docRef = collection(db, "TrelloList");
    const getRef = getDocs(docRef);

    if (getRef !== "") {
      addDoc(collection(db, "TrelloList"), {
        taskname: taskname,
      })
        .then(() => {
          console.log("berhasil");
        })
        .catch((e) => {
          console.log("gagal", e);
        });
    }
    setTaskName("");
  }

  useEffect(() => {
    onSnapshot(collection(db, "TrelloList"), (snap) => {
      const res = snap.docs.map((doc) => ({
        taskname: doc.taskname,
        ...doc.data(),
      }));
      return setArr(res);
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
  }
  return (
    <div className="App">
      <section>
        <CreateContext.Provider
          value={{
            column: column,
            handleButtonTask: handleButtonTask,
            setTaskName: setTaskName,
            taskname: taskname,
            handleOnDragEnd: handleOnDragEnd,
            setColumn: setColumn,
          }}
        >
          <ToDoList />
          <Board />
        </CreateContext.Provider>
      </section>

      <h1 className="m-5">get data firebase</h1>
      {arr.map((item, key) => {
        return <div key={key}>{item.taskname}</div>;
      })}
    </div>
  );
}

export default App;
