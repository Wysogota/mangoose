import React from 'react';
import { Carousel } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import styles from './Reader.module.scss';
import './reader.scss';

const Reader = (props) => {
  const [_, setSearchParams] = useSearchParams();
  const { chapterPages, currentPage, setCurrentPage } = props;

  const handleSelect = (selectedPage, e) => {
    setCurrentPage(selectedPage);
    setSearchParams(`?page=${selectedPage + 1}`);
    e.target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Carousel id='reader'
      interval={null} indicators={false} nextIcon={null} prevIcon={null} slide={false}
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
