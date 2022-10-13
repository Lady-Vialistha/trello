import React, { useState } from "react";
import { Draggable, Droppable, DragDropContext } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";

function Board() {
  const itemsFromBackend = [
    { id: uuidv4(), content: "First task" },
    { id: uuidv4(), content: "second task" },
  ];
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
  const [isColumn, setColumn] = useState(columnsFromBackend);

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
    <div className="d-flex justify-content-evenly">
      {isColumn.length !== 0 ? (
        <DragDropContext
          onDragEnd={(res) => handleOnDragEnd(res, isColumn, setColumn)}
        >
          {Object.entries(isColumn).map(([id, col]) => {
            console.log("iscolumn", isColumn);
            return (
              <div key={id}>
                <h5>{col.name}</h5>
                <Droppable droppableId={id}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                          backgroundColor: snapshot.isDraggingOver
                            ? "#0dcaf0y"
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
