/* globals window */
import './style.scss';
import PropTypes from 'prop-types';
import React from 'react';
import Swiper from 'react-id-swiper';
import styled from 'styled-components';

const Title = styled.div`
  padding: 0.5rem;
  font-size: 2rem;
  font-weight: bold;
  color: #fff;
  background-color: rgba(0, 0, 0, 0.5);
  text-align: center;
  position: absolute;
  bottom: 0.25rem;
  left: 0;
`;

let numberOfInstance = 1;

const pagination = {
  clickable: true,
  el: '.swiper-pagination',
  renderBullet: (i, className) => `
    <span class="${className}" onmouseover="swiper${numberOfInstance}.slideTo(${i})">
      ${i + 1}
    </span>`,
};

const setGlobalInstance = (swiperInstance) => {
  window[`swiper${numberOfInstance}`] = swiperInstance;
  numberOfInstance += 1;
};

export const ImageSwiper = ({ baseUrl, columns, items, showSwiperTitle }) => (
  <Swiper
    // effect="fade"
    getSwiper={setGlobalInstance}
    keyboard
    mousewheel
    // navigation={{
    //   nextEl: '.swiper-button-next',
    //   prevEl: '.swiper-button-prev',
    // }}
    pagination={pagination}
    shouldSwiperUpdate
    rebuildOnUpdate
    slidesPerView={columns}
    spaceBetween={columns === 1 ? 0 : 16}
    // speed={50}
  >
    {items.map(({ img, title, url }) => (
      // eslint-disable-next-line max-len
      // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
      <a
        href={`${baseUrl ? `${baseUrl}/` : ''}${url}`}
        rel="noopener noreferrer"
        target="_blank"
        title={title}
        style={{ position: 'relative' }}
      >
        <img
          key={url}
          src={`${baseUrl ? `${baseUrl}/` : ''}${img}`}
          alt={title}
          // title={title}
          // onClick={() => window.open(`${baseUrl ? `${baseUrl}/` : ''}${url}`)}
        />
        {showSwiperTitle && <Title>{title}</Title>}
      </a>
    ))}
  </Swiper>
);

ImageSwiper.defaultProps = {
  baseUrl: '',
  showTitle: false,
};

ImageSwiper.propTypes = {
  baseUrl: PropTypes.string,
  items: PropTypes.arrayOf((PropTypes.shape({
    img: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }))).isRequired,
  showSwiperTitle: PropTypes.bool,
};
