import React from 'react';
import MangaCard from '../MangaCard';
import CONSTANTS from '../../../constants';

const data = [
  {
    title: 'Attack on titan',
    desc: 'Best manga ever',
    image: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
    href: '#',
    genres: [
      'action',
      'complete',
      'seinen',
    ]
  },
  {
    title: 'Attack on titan 2',
    desc: 'Best manga ever 2',
    image: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
    href: '#',
    genres: [
      'complete',
      'seinen',
    ]
  },
  {
    title: 'Attack on titan 3',
    desc: 'Best manga ever 3',
    image: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
    href: '#',
    genres: [
      'action',
      'complete',
      'shounen',
    ]
  },
];

const MangaCatalog = ({ genres }) => {
  return (
    data
      .filter((item) => genres.every(genre => item.genres.includes(genre)))
      .map(({ title, desc, image, href }) =>
        <MangaCard key={title} title={title} desc={desc} image={image} to={href} />
      )
  );
};

export default MangaCatalog;
