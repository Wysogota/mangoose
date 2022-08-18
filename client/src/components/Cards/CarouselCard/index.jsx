import React from 'react';
import { Carousel } from 'react-bootstrap';
import CarouselHeader from '../../Carousels/CarouselHeader';
import { getLocaleValue, selectRelationship } from '../../../common/functions';
import CONSTANTS from '../../../constants';
const {
  PAGES: { TITLE: { path } },
  MANGA_COVER_SIZES: { RAW },
} = CONSTANTS;


const CarouselCard = (props) => {
  const { manga = {}, imageSize = RAW } = props;

  const { id, attributes: { title }, relationships } = manga;
  const image = selectRelationship(relationships, 'cover_art').attributes.urls[imageSize];
  const localedValue = getLocaleValue(title);

  return (
    <>
      <img
        className='d-block w-100'
        src={image}
        alt={localedValue}
      />
      <Carousel.Caption>
        <CarouselHeader to={`${path}/${id}`} shouldInvertedHovered>
          {localedValue}
        </CarouselHeader>
      </Carousel.Caption>
    </>
  );
};

export default CarouselCard;
