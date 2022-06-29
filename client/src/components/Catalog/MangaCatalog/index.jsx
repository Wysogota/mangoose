import React from 'react';
import MangaCard from '../MangaCard';
import CONSTANTS from '../../../constants';

const MangaCatalog = (props) => {
  const { catalog, genres, className } = props;
  return (
    catalog
      // .filter((manga) => genres.every(genre => manga.genres.includes(genre)))
      .map((manga) => {
        const {
          id,
          attributes: {
            title: { [CONSTANTS.DEFAULT_LOCALE]: title },
            description: { [CONSTANTS.DEFAULT_LOCALE]: desc }
          },
          relationships,
        } = manga;
        const coverUrl = relationships.filter((item) => item.type === 'cover_art')[0].attributes.url;
        return (
          <MangaCard
            key={id} title={title}
            desc={desc}
            image={coverUrl}
            to={id} className={className}
          />
        );
      })
  );
};

export default MangaCatalog;
