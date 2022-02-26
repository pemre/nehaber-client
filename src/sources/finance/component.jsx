import './style.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { List } from '../../atoms/list';

const FinanceItem = ({
  change, name, positive, value,
}) => (
  <>
    <a
      style={{ color: '#aaa' }}
      href={`https://www.google.com/search?q=${name}`}
      target="_blank"
      rel="noopener noreferrer"
    >
      {name}
    </a>
    <div style={{ color: positive ? 'green' : 'red' }}>{change}</div>
    <div>{value}</div>
  </>
);

export const FinanceComponent = ({ items, columns }) => (
  <div className="finance">
    <List
      columns={columns}
      items={items}
      keyExtractor={({ name }) => name}
      renderItem={FinanceItem}
    />
    <iframe
      className="frame"
      src="https://sslcharts.investing.com/index.php?pair_ID=66&timescale=86400&detach=off&print_title_table=No&style=line"
      title="eur-try"
      width="100%"
    />
  </div>
);

FinanceItem.propTypes = {
  change: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  positive: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

FinanceComponent.propTypes = {
  items: PropTypes.arrayOf(FinanceItem).isRequired,
  columns: PropTypes.number.isRequired,
};
