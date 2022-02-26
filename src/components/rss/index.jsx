import './style.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { List } from '../../atoms/list';

export const Rss = ({ items, columns = 5 }) => (
  <List
    columns={columns}
    items={items}
    keyExtractor={({ url }) => url}
    renderItem={({ desc, title, url }) => (
      <div className="rss">
        <a className="rss__title" href={url}>{title}</a>
        {/* <div className="rss__desc">{desc}</div> */}
        {/* Webtekno source uses image tags in its rss */}
        <div className="rss__desc" dangerouslySetInnerHTML={{ __html: desc }} />
      </div>
    )}
  />
);

Rss.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    desc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  columns: PropTypes.number,
};
