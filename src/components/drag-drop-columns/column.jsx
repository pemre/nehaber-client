/* eslint react/jsx-props-no-spreading: 0 */

import PropTypes from 'prop-types';
import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import { Item } from './item';

const Container = styled.div`
  padding: 1rem;
  border: 2px dashed #9f581e;
  display: flex;
  flex-direction: column;
  width: calc(50% - 0.5rem);
`;
const Title = styled.span`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;
const ItemList = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${(props) => (props.isDraggingOver ? '#3d4f31' : '')};
  flex-grow: 1;
  min-height: 100px;
`;

export const Column = ({ column, items }) => (
  <Container>
    <Title>{column.title}</Title>
    <Droppable droppableId={column.id}>
      {(provided, snapshot) => (
        <ItemList
          ref={provided.innerRef}
          {...provided.droppableProps}
          isDraggingOver={snapshot.isDraggingOver}
        >
          {items.map((item, index) => (
            <Item key={item.id} item={item} index={index} isInDisabledColumn={column.id === 'disabled'} />
          ))}
          {provided.placeholder}
        </ItemList>
      )}
    </Droppable>
  </Container>
);

Column.propTypes = {
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  items: PropTypes.arrayOf((PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }))).isRequired,
};
