/* eslint react/jsx-props-no-spreading: 0 */

import './style.scss';
import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { moveDraggable, moveItemInArray } from '../../lib/helpers';

const COLUMN_A = 'COLUMN_A';
const COLUMN_B = 'COLUMN_B';

// eslint-disable-next-line react/prop-types
export const DragDropTwoColumns = ({
  // eslint-disable-next-line react/prop-types
  columnA, columnB, onChangeColumnA, onChangeColumnB,
}) => {
  const id2List = {
    [COLUMN_A]: columnA,
    [COLUMN_B]: columnB,
  };

  const getList = (id) => id2List[id];

  const onDragEnd = (result) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      const sources = moveItemInArray(
        getList(source.droppableId),
        source.index,
        destination.index,
      );

      if (source.droppableId === COLUMN_A) {
        onChangeColumnA(sources);
      } else {
        onChangeColumnB(sources);
      }
    } else {
      const result2 = moveDraggable(
        getList(source.droppableId),
        getList(destination.droppableId),
        source,
        destination,
      );
      onChangeColumnA(result2[COLUMN_A]);
      onChangeColumnB(result2[COLUMN_B]);
    }
  };

  return (
    <div className="ddtc">
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId={COLUMN_A}>
          {(provided) => (
            <div
              className="ddtc__columnA"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="ddtc__title">Enabled</div>
              {/* eslint-disable-next-line react/prop-types */}
              {columnA.map((source, i) => (
                <Draggable draggableId={source.id} index={i} key={source.id}>
                  {(provided2, snapshot) => (
                    <div
                      className="ddtc__item"
                      ref={provided2.innerRef}
                      {...provided2.draggableProps}
                      {...provided2.dragHandleProps}
                      style={{
                        background: snapshot.isDragging ? '#305b89' : '',
                        ...provided2.draggableProps.style,
                      }}
                    >
                      {source.logo && <img className="ddtc__item-logo" src={source.logo} alt="" />}
                      {source.name && <span>{source.name}</span>}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
        <Droppable droppableId={COLUMN_B}>
          {(provided) => (
            <div
              className="ddtc__columnB"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              <div className="ddtc__title">Disabled</div>
              {/* eslint-disable-next-line react/prop-types */}
              {columnB.map((source, i) => (
                <Draggable draggableId={source.id} index={i} key={source.id}>
                  {(provided2, snapshot) => (
                    <div
                      className="ddtc__item"
                      ref={provided2.innerRef}
                      {...provided2.draggableProps}
                      {...provided2.dragHandleProps}
                      style={{
                        background: snapshot.isDragging ? '#305b89' : '',
                        ...provided2.draggableProps.style,
                      }}
                    >
                      {source.logo && <img className="ddtc__item-logo" src={source.logo} alt="" />}
                      {source.name && <span>{source.name}</span>}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
