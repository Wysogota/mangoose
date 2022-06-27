import React from 'react';
import CONSTANTS from '../../constants';

const data = [{
  image: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
  alt: CONSTANTS.DEFAULT_POSTER,
  href: '#',
}];

const Advertisement = () => {
  return (
    <a href={data[0].href} target='_blank' rel='noreferrer' className='position-relative'>
      <img
        className='d-block w-100 rounded'
        src={data[0].image}
        alt={data[0].alt}
      />
    </a>
  );
};

export default Advertisement;
