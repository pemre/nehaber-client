import './style.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { List } from '../../atoms/list';

export const RssAudio = ({ items, columns = 5 }) => (
  <List
    columns={columns}
    items={items}
    keyExtractor={({ url }) => url}
    renderItem={({ desc, title, url }) => (
      <div className="rss-audio">
        <audio controls preload="metadata" style={{ width: '100%' }}>
          <source src={url} />
            Your browser does not support the audio element.
        </audio>
        <a className="rss-audio__title" href={url}>{title}</a>
        <div className="rss-audio__desc">{desc}</div>
      </div>
    )}
  />
);

RssAudio.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    desc: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  })).isRequired,
  columns: PropTypes.number,
};
