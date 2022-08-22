import React from 'react';
import PropTypes from 'prop-types';
import ColBlock from '../../Blocks/ColBlock';
import MangaCard from '../../Cards/MangaCard';
import styles from './MangaCatalog.module.scss'
import CONSTANTS from '../../../constants';
const { MANGA_COVER_SIZES: { MEDIUM } } = CONSTANTS;

const MangaCatalog = (props) => {
  const { catalog, className } = props;

  return (
    catalog.map((manga) =>
      <ColBlock key={manga.id} className={className}>
        <MangaCard manga={manga} imageSize={MEDIUM} className={styles.card}/>
      </ColBlock>
    )
  );
};

MangaCatalog.propTypes = {
  catalog: PropTypes.array.isRequired,
  className: PropTypes.string,
};

export default MangaCatalog;
