/* eslint react/jsx-props-no-spreading: 0 */

import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

const Container = styled.div`
  border: 1px solid ${(props) => (props.isInDisabledColumn ? '#752a22' : '#3d4f31')};
  padding: 0.5rem;
  margin-bottom: 8px;
  background-color: ${(props) => (props.isDragging ? '#4b8930' : '#232327')};
  display: flex;
  
  &:hover {
    border: 1px solid ${(props) => (props.isInDisabledColumn ? '#9f581e' : '#4b8930')};
  }
`;

const Image = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.5rem;
`;

const Text = styled.span`
  font-size: 1.5rem;
`;

export const Item = ({ index, isInDisabledColumn, item }) => (
  <Draggable draggableId={item.id} index={index}>
    {(provided, snapshot) => (
      <Container
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
        isDragging={snapshot.isDragging}
        isInDisabledColumn={isInDisabledColumn}
      >
        <Image src={item.imageUrl} alt={item.text} />
        <Text>{item.text}</Text>
      </Container>
    )}
  </Draggable>
);

Item.propTypes = {
  index: PropTypes.number.isRequired,
  isInDisabledColumn: PropTypes.bool.isRequired,
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};
