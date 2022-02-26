/* globals localStorage */

import { useEffect, useState } from 'react';
import { STORAGE_TYPE } from './enums';

export const callIfInsideLimits = (callback, value, max = Infinity, min = 0) => {
  if (value >= min && value <= max) {
    callback(value);
  }
};

export const getSourceOrder = (id) => {
  const order = localStorage.getItem(`${id}--order`);
  return order !== null
    ? Number(order) || 0
    : 0;
};

export const insertItemIntoArray = (item, array, order) => [
  ...array.slice(0, order),
  item,
  ...array.slice(order),
];

export const isSourceEnabled = (id) => localStorage.getItem(`${id}--enabled`) === 'true';

export const moveDraggable = (source, destination, droppableSrc, droppableDst) => {
  const sourceClone = [...source];
  const destClone = [...destination];
  const [removed] = sourceClone.splice(droppableSrc.index, 1);
  destClone.splice(droppableDst.index, 0, removed);

  return {
    [droppableSrc.droppableId]: sourceClone,
    [droppableDst.droppableId]: destClone,
  };
};

export const moveItemInArray = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

export const useStateWithStorage = (initialState, key, type = STORAGE_TYPE.STRING) => {
  let typeOfState;

  switch (typeof initialState) {
    case 'number':
      typeOfState = 'number';
      break;
    case 'string':
      typeOfState = 'number';
      break;
    case 'boolean':
      typeOfState = 'number';
      break;
    case 'object':
      // TODO Check array
      typeOfState = 'number';
      // use Array.isArray or Object.prototype.toString.call
      // typeof [1, 2, 4] === 'object';
      //
      break;
    default:
      break;
  }

  let storedValue = localStorage.getItem(key);

  if (storedValue !== null) {
    switch (type) {
      // case STORAGE_TYPE.ARRAY:
      //   storedValue = Array.from(storedValue);
      //   break;
      case STORAGE_TYPE.BOOL:
        storedValue = storedValue === 'true';
        break;
      case STORAGE_TYPE.NUMBER:
        storedValue = Number(storedValue);
        break;
      case STORAGE_TYPE.OBJECT:
        storedValue = JSON.parse(storedValue);
        break;
      case STORAGE_TYPE.STRING:
      default:
        break;
    }
  }

  // This let's number "0" to be a valid initState
  const currentState = (
    storedValue !== null
    && typeof storedValue !== 'undefined'
  )
    ? storedValue
    : initialState;

  const [value, setValue] = useState(currentState);

  if (type === STORAGE_TYPE.OBJECT) {
    useEffect(() => localStorage.setItem(key, JSON.stringify(value)), [value]);
  } else {
    useEffect(() => localStorage.setItem(key, value), [value]);
  }
  return [value, setValue];
};
