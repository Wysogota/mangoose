import React from 'react';
import ColBlock from '../../Blocks/ColBlock';
import MangaCard from '../../Cards/MangaCard';
import CONSTANTS from '../../../constants';
const { MANGA_COVER_SIZES: { MEDIUM } } = CONSTANTS;

const MangaCatalog = (props) => {
  const { catalog, className } = props;

  return (
    catalog.map((manga) =>
      <ColBlock key={manga.id} className={className}>
        <MangaCard manga={manga} imageSize={MEDIUM} />
      </ColBlock>
    )
  );
};

export default MangaCatalog;
