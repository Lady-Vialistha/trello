import React from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";

function Board({ column, setColumn = () => {}, handleOnDragEnd = () => {} }) {
  return (
    <div className="d-flex justify-content-evenly">
      {column.length !== 0 ? (
        <DragDropContext
          onDragEnd={(res) => handleOnDragEnd(res, column, setColumn)}
        >
          {Object.entries(column).map(([id, col]) => {
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
