import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import styles from './Reader.module.scss';
import './reader.scss';
import CONSTANTS from '../../../constants';
const { PARAM_NAME: { page } } = CONSTANTS;


const Reader = (props) => {
  const [_, setSearchParams] = useSearchParams();
  const { chapterPages, currentPage, setCurrentPage } = props;

  const handleSelect = (selectedPage) => {
    setCurrentPage(selectedPage);
    setSearchParams(`?page=${selectedPage}`);
  };

  return (
    <Carousel id='reader'
      interval={null} indicators={false} nextIcon={null} prevIcon={null}
      activeIndex={currentPage} onSelect={handleSelect}
    >
      {chapterPages.data.map(((image, i) =>
        <Carousel.Item key={i}>
          <img
            className={styles.image}
            src={`https://uploads.mangadex.org/data/${chapterPages.hash}/${image}`}
            alt={image}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Reader;
