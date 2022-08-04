import React from 'react';
import CatalogCard from '../CatalogCard';

const MangaCatalog = (props) => {
  const { catalog, className } = props;

  return (
    catalog.map((manga) =>
      <CatalogCard key={manga.id} manga={manga} className={className} />
    )
  );
};

export default MangaCatalog;
