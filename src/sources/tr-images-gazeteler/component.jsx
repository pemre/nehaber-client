import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss';

export const Component = ({ items, columns }) => (
  <Swiper
    // slidesPerView="auto"
    slidesPerView={columns}
    centeredSlides
    spaceBetween={16}
    pagination={{
      clickable: true,
    }}
    className="mySwiper"
  >
    {items.map((i) => (
      // <SwiperSlide>
        <a
          href={i.urlImage}
          rel="noopener noreferrer"
          target="_blank"
          title={i.name}
          style={{ position: 'relative' }}
        >
          <img src={i.urlImageThumb} alt={i.name} key={i.name} />
        </a>
      // </SwiperSlide>
    ))}
  </Swiper>
);
