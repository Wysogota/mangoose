import React from 'react';
import CatalogCard from '../CatalogCard';
import CONSTANTS from '../../../constants';
const { MANGA_COVER_SIZES: { MEDIUM } } = CONSTANTS;

const MangaCatalog = (props) => {
  const { catalog, className } = props;

  return (
    catalog.map((manga) =>
      <CatalogCard
        key={manga.id}
        manga={manga}
        imageSize={MEDIUM}
        className={className}
      />
    )
  );
};

export default MangaCatalog;
