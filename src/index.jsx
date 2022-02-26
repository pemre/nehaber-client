/* globals document */

import './style.scss';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { useStateWithStorage } from './lib/helpers';
import { IconSource } from './atoms/icons';
import { Source } from './components/source';
import { DragDropColumns } from './components/drag-drop-columns';
import initialData from './components/drag-drop-columns/initial-data';
import { STORAGE_TYPE } from './lib/enums';
import { Component as AudioComponent } from './sources/rfi-audio/component';
import { FinanceComponent } from './sources/finance/component';
import { Component } from './sources/eksi-sozluk/component';
// import { Component as ImagesComponent } from './sources/tr-images-gazeteler/component';
import { ImageSwiper } from './components/image-swiper';
import { Rss } from './components/rss';
import { RssAudio } from './components/rss-audio';

// eslint-disable-next-line no-undef
const DEBUG = new URLSearchParams(window.location.search).has('debug');
const DEBUG_URL = 'http://localhost:5000/';

const useSources = (initialState) => useStateWithStorage(initialState, 'aaa--initial', STORAGE_TYPE.OBJECT);

const App = () => {
  const [es, setEs] = useSources(initialData);
  const [esItems, setEsItems] = useState({});

  useEffect(() => {
    es.columns.enabled.itemIds.forEach(async (id) => {
      // Skip if we already fetched the news OR source has no url to fetch
      if (!esItems.id && es.items[id].url) {
        const url = DEBUG ? DEBUG_URL + id : es.items[id].url;
        const { data: items } = await axios.get(url);
        setEsItems((prev) => ({ ...prev, ...{ [id]: items } }));
      }
    });
  }, [es]);

  return (
    <>
      {es.columns.enabled.itemIds.map((id) => {
        let component;

        switch (es.items[id].type) {
          case 'audio':
            component = AudioComponent;
            break;
          case 'rss':
            component = Rss;
            break;
          case 'rss-audio':
            component = RssAudio;
            break;
          case 'eksi':
            component = Component;
            break;
          case 'finance':
            component = FinanceComponent;
            break;
            // TODO Merge images & ImageSwiper
          // case 'images':
          //   component = ImagesComponent;
          //   break;
          case 'image-swiper':
            component = ImageSwiper;
            break;
          default:
            component = () => (<>This source has no component 😿.</>);
            break;
        }

        const source = {
          id,
          imageUrl: es.items[id].imageUrl,
          name: es.items[id].text,
          Component: component,
          showColumns: es.items[id].showColumns !== false,
          showLimit: es.items[id].showLimit !== false,
          showSwiperTitle: id === 'tr-swiper-cumhuriyet',
          // It's a static source if it has no url
          isStaticSource: !es.items[id].url,
        };

        // console.log('###### source', source, esItems[id], id);

        return (
          <Source source={source} items={esItems[id]} key={id} />
        );
      })}

      <div className="title">
        <IconSource />
        {' '}
        Sources
      </div>

      <DragDropColumns initialState={es} onUpdate={(updatedState) => setEs(updatedState)} />
    </>
  );
};

render(<App />, document.querySelector('.app'));

if (module.hot) { module.hot.accept(); }
