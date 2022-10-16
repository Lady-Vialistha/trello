import React, { useState } from "react";
import "./App.css";
import ToDoList from "./Component/ToDoList";
import { v4 as uuidv4 } from "uuid";
import Board from "./Component/Board";
function App() {
    const [todo, setTodo] = useState([]);
    const [task, setTask] = useState("");

    const itemsFromBackend = [
        { id: uuidv4(), content: "tatyusk" },
        { id: uuidv4(), content: "tatyuxcvbgdfsk" },
    ];
    console.log("items", itemsFromBackend[0].content);
    const columnsFromBackend = {
        [uuidv4()]: {
            name: "Open Progress",
            items: itemsFromBackend,
        },
        [uuidv4()]: {
            name: "In Progress",
            items: [],
        },
        [uuidv4()]: {
            name: "Done Progress",
            items: [],
        },
    };
    const [column, setColumn] = useState(columnsFromBackend);
    function handleButtonTask() {
        // setColumn(column[0].items);
        // setColumn(itemsFromBackend[0].content);
        setTodo([...todo, task]);
    }

    const printTask = todo.map((item, key) => {
        return (
            <ul key={key}>
                <li>{item}</li>
            </ul>
        );
    });

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
                {printTask}
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
