import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  useReducer,
} from "react";
import "./App.css";
import ToDoList from "./Component/ToDoList";
import { v4 as uuidv4 } from "uuid";
import Board from "./Component/Board";
import { onSnapshot, collection, getDocs, addDoc } from "firebase/firestore";
import db from "../src/Config/FirebaseConfig";

export const CreateContext = createContext();
function App() {
  const [taskname, setTaskName] = useState("");
  const columnsFromBackend = {
    open: {
      name: "Open Progress",
      items: [],
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
          console.log("berhasil ditambah ke firebase");
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
      return res;
    });
  }, []);

  useEffect(() => {
    const cardItems = JSON.parse(localStorage.getItem("column"));
    if (cardItems) {
      setColumn(cardItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("column", JSON.stringify(column));
  }, [column]);

  function handleOnDragEnd(res, col, setCol) {
    if (!res.destination) return;
    const { source, destination } = res;

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

  function reducerFn(state, action) {
    switch (action.type) {
      case "remove":
        const deleteItem = state.filter((item) => item.id !== action.id);
        console.log("delete", deleteItem);
        return deleteItem;
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducerFn, []);
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
            state: state,
            dispatch: dispatch,
          }}
        >
          <ToDoList />
          <Board />
        </CreateContext.Provider>
      </section>
    </div>
  );
}

export default App;
