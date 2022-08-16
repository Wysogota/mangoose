import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { Carousel } from 'react-bootstrap';
import ColBlock from '../../Blocks/ColBlock';
import CarouselHeader from '../CarouselHeader';
import elements from '../../../common/styles/elements.module.scss';
import CONSTANTS from '../../../constants';

const SingleCarousel = () => {
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);

  const headerClasses = cx(
    elements.header,
    'pb-3 text-nowrap',
  );

  return (
    <ColBlock>
      <h3 className={headerClasses}>Recommendation</h3>
      <Carousel interval='10000' variant={mainColor} >
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
