import './style.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { IconDownArrow, IconUpArrow } from '../../atoms/icons';

export const NumberPicker = ({ number, onChange }) => (
  <div className="number-picker">
    <input
      className="number-picker__input"
      type="text"
      value={number}
      onChange={(e) => onChange(e.target.value)}
    />
    <span className="number-picker__buttons">
      <button
        className="number-picker__btn-up"
        onClick={() => onChange(number + 1)}
        type="button"
      >
        <IconUpArrow />
      </button>
      <button
        className="number-picker__btn-down"
        onClick={() => onChange(number - 1)}
        type="button"
      >
        <IconDownArrow />
      </button>
    </span>
  </div>
);

NumberPicker.propTypes = {
  number: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
