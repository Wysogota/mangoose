import React from 'react';
import { useSelector } from 'react-redux';
import { Carousel, Col } from 'react-bootstrap';
import cx from 'classnames';
import CONSTANTS from '../../constants';
import CarouselHeader from '../CarouselHeader';

const SingleCarousel = () => {
  const { theme: { bgTheme, mainColor } } = useSelector(({ themes }) => themes);
  const colClasses=cx(
    bgTheme,
    'p-3 mb-4 rounded'
  )
  return (
    <Col className={colClasses}>
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
    </Col>
  );
};

export default SingleCarousel;
