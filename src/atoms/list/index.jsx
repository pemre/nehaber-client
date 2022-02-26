import './style.scss';
import PropTypes from 'prop-types';
import React from 'react';

export const List = ({
  items,
  renderItem,
  keyExtractor,
  columns,
}) => (
  <ul className="list row">
    {items.map((item) => (
      <li key={keyExtractor(item)} className={`list__item col-${columns}`}>
        {renderItem(item)}
      </li>
    ))}
  </ul>
);

List.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  keyExtractor: PropTypes.func.isRequired,
  renderItem: PropTypes.elementType.isRequired,
  columns: PropTypes.number.isRequired,
};
