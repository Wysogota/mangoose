import React from 'react';
import { useSelector } from 'react-redux';
import { Carousel } from 'react-bootstrap';
import ColBlock from '../../Blocks/ColBlock';
import CarouselHeader from '../CarouselHeader';
import CONSTANTS from '../../../constants';

const SingleCarousel = () => {
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);

  return (
    <ColBlock>
      <h3 className='pb-3'>Manga of the day</h3>
      <Carousel interval='50000' variant={mainColor} >
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER}
            alt={CONSTANTS.DEFAULT_POSTER}
          />
          <Carousel.Caption>
            <CarouselHeader to='/attack-on-titan' shouldInvertedHovered>Attack on titan</CarouselHeader>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className='d-block w-100'
            src={CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER}
            alt={CONSTANTS.DEFAULT_POSTER}
          />
          <Carousel.Caption>
            <CarouselHeader to='#' shouldInvertedHovered>Attack on titan 2</CarouselHeader>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </ColBlock>
  );
};

export default SingleCarousel;
