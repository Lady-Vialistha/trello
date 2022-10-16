import React from "react";
import ToDoList from "./Component/ToDoList";
import Board from "./v2/Components/Board";
import "../src/App.css";
import { v4 as uuidv4 } from "uuid";
const AppVTwo = () => {
    const [task, setTask] = React.useState("");
    const [todo, setTodo] = React.useState([]);
    function handleButtonTask() {
        setTodo([
            ...todo,
            {
                id: uuidv4(),
                content: task,
                status: 1,
            },
        ]);
        setTask("");
    }
    return (
        <div className="App">
            <section>
                <ToDoList
                    handleButtonTask={handleButtonTask}
                    setTask={setTask}
                    task={task}
                />
                <Board todo={todo} />
            </section>
        </div>
    );
};
export default AppVTwo;
