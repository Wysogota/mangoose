import React from 'react';
import CatalogCard from '../CatalogCard';
import CONSTANTS from '../../../constants';

const MangaCatalog = (props) => {
  const { catalog, className } = props;

  return (
    catalog
      .map((manga) => {
        const {
          id,
          attributes: {
            title: { [CONSTANTS.DEFAULT_LOCALE]: title }, //TODO если пусто тогда искать первое что не пусто
            description: { [CONSTANTS.DEFAULT_LOCALE]: desc }
          },
          relationships,
        } = manga;
        const coverUrl = relationships.filter((item) => item.type === 'cover_art')[0].attributes.url;
        return (
          <CatalogCard
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
