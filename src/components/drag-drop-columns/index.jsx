import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import { Column } from './column';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const DragDropColumns = ({ initialState, onUpdate }) => {
  const [state, setState] = useState(initialState);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Cancel if dragged outside of droppables
    if (!destination) {
      return;
    }

    // Cancel if dropped to the same place
    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }

    const start = state.columns[source.droppableId];
    const finish = state.columns[destination.droppableId];

    if (start === finish) {
      const newItemIds = Array.from(start.itemIds);
      newItemIds.splice(source.index, 1);
      newItemIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        itemIds: newItemIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newColumn.id]: newColumn,
        },
      };

      setState(newState);
      onUpdate(newState);
      return;
    }

    // Moving from one list to another
    const startItemIds = Array.from(start.itemIds);
    startItemIds.splice(source.index, 1);
    const newStart = {
      ...start,
      itemIds: startItemIds,
    };

    const finishItemIds = Array.from(finish.itemIds);
    finishItemIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      itemIds: finishItemIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    setState(newState);
    onUpdate(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {state.columnOrder.map((columnId) => {
          const column = state.columns[columnId];
          const items = column.itemIds.map(
            (itemId) => state.items[itemId],
          );

          return <Column key={column.id} column={column} items={items} />;
        })}
      </Container>
    </DragDropContext>
  );
};

DragDropColumns.defaultProps = {
  onUpdate: () => {},
};

DragDropColumns.propTypes = {
  initialState: PropTypes.shape({
    columnOrder: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  onUpdate: PropTypes.func,
};
