import React, { useContext, useReducer } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { CreateContext } from "../App";

function Board() {
  const column = useContext(CreateContext).column;
  const setColumn = useContext(CreateContext).setColumn;
  const handleOnDragEnd = useContext(CreateContext).handleOnDragEnd;
  const dispatch = useContext(CreateContext).dispatch;
  const deleteTask = useContext(CreateContext).deleteTask;

  return (
    <div className="d-flex justify-content-evenly">
      {column.length !== 0 ? (
        <DragDropContext
          onDragEnd={(res) => handleOnDragEnd(res, column, setColumn)}
        >
          {Object.entries(column).map(([id, col]) => {
            console.log(col, "colS");
            return (
              <div key={id}>
                <h5>{col.name}</h5>
                <div>
                  <Droppable droppableId={id}>
                    {(provided, snapshot) => {
                      return (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{
                            backgroundColor: snapshot.isDraggingOver
                              ? "rgb(141, 156, 179)"
                              : "#0dcaf059",
                          }}
                          className="box"
                        >
                          {col.items.map((item, index) => {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        backgroundColor: snapshot.isDragging
                                          ? "#0dcaf059"
                                          : "#192131",
                                        ...provided.draggableProps.style,
                                      }}
                                      className="box-list"
                                    >
                                      {item.content}

                                      <button
                                        onClick={() =>
                                          dispatch({
                                            type: "remove",
                                            payload: { id: item.id },
                                          })
                                        }
                                      >
                                        delete
                                      </button>
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          })}

                          {provided.placeholder}
                        </div>
                      );
                    }}
                  </Droppable>
                </div>
              </div>
            );
          })}
        </DragDropContext>
      ) : (
        <p>Tidak ada data</p>
      )}
    </div>
  );
}
export default Board;
