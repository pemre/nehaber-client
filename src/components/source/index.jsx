import './style.scss';
import PropTypes from 'prop-types';
import React from 'react';
import { IconMenu } from '../../atoms/icons';
import { SettingsColumns } from '../settings-columns';
import { SettingsLimit } from '../settings-limit';
import { STORAGE_TYPE } from '../../lib/enums';
import { callIfInsideLimits, useStateWithStorage } from '../../lib/helpers';
import { Loading } from '../loading';

const DEFAULT = {
  COLUMNS: 3,
  COLUMNS_MAX: 10,
  LIMIT: 9,
  SHOW_SETTINGS: false,
};

const useColumns = (id) => useStateWithStorage(DEFAULT.COLUMNS, `${id}--columns`, STORAGE_TYPE.NUMBER);
const useLimit = (id) => useStateWithStorage(DEFAULT.LIMIT, `${id}--limit`, STORAGE_TYPE.NUMBER);
const useShowSettings = (id) => useStateWithStorage(DEFAULT.SHOW_SETTINGS, `${id}--show-settings`, STORAGE_TYPE.BOOL);

export const Source = (props) => {
  const {
    items = [],
    source: {
      baseUrl,
      Component,
      id,
      imageUrl,
      isStaticSource,
      name,
      showColumns,
      showLimit,
      showSwiperTitle,
    },
  } = props;

  if (!isStaticSource && items.length === 0) { return <Loading />; }

  const [columns, setColumns] = useColumns(id);
  const [limit, setLimit] = useLimit(id);
  const [showSettings, setShowSettings] = useShowSettings(id);
  const filteredItems = limit ? items.slice(0, limit) : items;

  return (
    <div className="source">
      <div className="source__header">
        <img className="source__logo" src={imageUrl} alt={name} />
        <span className="source__title">{name}</span>
        <IconMenu onClick={() => setShowSettings(!showSettings)} />
      </div>
      {showSettings && (
        <div className="settings">
          <div className="settings__container">
            {showColumns && (
              <SettingsColumns
                columns={columns}
                onChange={(n) => callIfInsideLimits(setColumns, n, DEFAULT.COLUMNS_MAX, 1)}
              />
            )}
            {showLimit && (
              <SettingsLimit
                limit={limit}
                onChange={(n) => callIfInsideLimits(setLimit, n, items.length)}
              />
            )}
          </div>
        </div>
      )}
      <Component
        baseUrl={baseUrl}
        items={filteredItems}
        columns={columns}
        showSwiperTitle={showSwiperTitle}
      />
    </div>
  );
};

Source.propTypes = {
  items: PropTypes.array, // TODO Define shape
  source: PropTypes.shape({
    baseUrl: PropTypes.string,
    Component: PropTypes.func.isRequired,
    id: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    showColumns: PropTypes.bool,
    showLimit: PropTypes.bool,
    showSwiperTitle: PropTypes.bool,
    isStaticSource: PropTypes.bool,
  }).isRequired,
};
