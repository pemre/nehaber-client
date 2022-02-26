import PropTypes from 'prop-types';
import React from 'react';
import { IconItems } from '../../atoms/icons';
import { NumberPicker } from '../number-picker';

export const SettingsLimit = ({ limit, onChange }) => (
  <>
    <IconItems />
    <NumberPicker number={limit} onChange={(n) => onChange(n)} />
  </>
);

SettingsLimit.propTypes = {
  limit: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
