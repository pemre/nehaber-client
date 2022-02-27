import './style.scss';
import PropTypes from 'prop-types';
import React from 'react';

const getRankColor = (i) => {
  if (i > 1000) return '#ff0000';
  if (i > 500) return '#ff8000';
  if (i > 300) return '#ffbf00';
  if (i > 200) return '#ffff00';
  if (i > 100) return '#bfff00';
  if (i > 80) return '#55ff00';
  if (i > 60) return '#00ff55';
  if (i > 40) return '#00ffbf';
  if (i > 20) return '#00bfff';
  if (i > 10) return '#0088bb';
  return '#5599aa';
};

export const Component = ({ items, columns }) => (
  <ul className="eksi-sozluk" style={{ columns }}>
    {items.map(({ rank, title, url }) => (
      <li key={url}>
        <a
          href={url}
          rel="noopener noreferrer"
          style={{ color: getRankColor(rank) }}
          target="_blank"
        >
          {title}
        </a>
        {' '}
        {rank}
      </li>
    ))}
  </ul>
);

Component.defaultProps = {
  columns: 1,
};

Component.propTypes = {
  items: PropTypes.arrayOf((PropTypes.shape({
    rank: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }))).isRequired,
  columns: PropTypes.number,
};
