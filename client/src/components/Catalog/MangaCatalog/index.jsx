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
  {
    title: 'Attack on titan 4',
    desc: 'Best manga ever 4',
    image: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
    href: '#',
    genres: [
      'action',
      'complete',
      'shounen',
    ]
  },
  {
    title: 'Attack on titan 5',
    desc: 'Best manga ever 5',
    image: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
    href: '#',
    genres: [
      'action',
      'complete',
      'shounen',
    ]
  },
  {
    title: 'Attack on titan 6',
    desc: 'Best manga ever 6',
    image: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
    href: '#',
    genres: [
      'action',
      'complete',
      'shounen',
    ]
  },
  {
    title: 'Attack on titan 7',
    desc: 'Best manga ever 7',
    image: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
    href: '#',
    genres: [
      'action',
      'complete',
      'shounen',
    ]
  },
  {
    title: 'Attack on titan 8',
    desc: 'Best manga ever 8',
    image: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
    href: '#',
    genres: [
      'action',
      'complete',
      'shounen',
    ]
  },
];

const MangaCatalog = ({ genres, className }) => {
  return (
    data
      .filter((item) => genres.every(genre => item.genres.includes(genre)))
      .map(({ title, desc, image, href }) =>
        <MangaCard
          key={title} title={title}
          desc={desc} image={image}
          to={href} className={className}
        />
      )
  );
};

export default MangaCatalog;
