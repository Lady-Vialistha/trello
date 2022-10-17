import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import "../App.css";

function DragAndDropApp() {
  const item = {
    id: uuidv4(),
    name: "clean the house",
  };
  const item2 = {
    id: uuidv4(),
    name: "clean the room",
  };
  const [state, setState] = useState({
    todo: {
      title: "Open Progress",
      items: [item],
    },
    "in-progress": {
      title: "In Progress",
      items: [item2],
    },
    done: {
      title: "Done Progress",
      items: [],
    },
  });
  const handleOnDragEnd = (destination, source) => {
    if (!destination) {
      return;
    }
    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    } else {
    }
  };

  return (
    <div className="d-flex justify-content-evenly">
      <DragDropContext onDragEnd={handleOnDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div key={key}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={{
                        backgroundColor: snapshot.isDraggingOver
                          ? "rgb(141, 156, 179)"
                          : "#0dcaf059",
                      }}
                      className="box"
                    >
                      {data.items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            index={index}
                            draggableId={item.id}
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
                                  {item.name}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}
export default DragAndDropApp;
