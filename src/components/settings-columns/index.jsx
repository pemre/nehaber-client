import PropTypes from 'prop-types';
import React from 'react';
import { IconColumns } from '../../atoms/icons';
import { NumberPicker } from '../number-picker';

export const SettingsColumns = ({ columns, onChange }) => (
  <>
    <IconColumns />
    <NumberPicker number={columns} onChange={(n) => onChange(n)} />
  </>
);

SettingsColumns.propTypes = {
  columns: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
