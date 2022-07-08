import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import styles from './Reader.module.scss';
import './reader.scss';

const Reader = (props) => {
  const [_, setSearchParams] = useSearchParams();
  const { chapterPages, currentPage } = props;
  const { nextChapterId } = useSelector(({ nextChapterId }) => nextChapterId);
  const [prevPage, setPrevPage] = useState(0);
  const navigate = useNavigate();

  const handleSelect = (selectedPage, e) => {
    (selectedPage === 0 && prevPage === chapterPages.data.length - 1)
      ? navigate(`/chapter/${nextChapterId}`, { state: true })
      : setSearchParams(`?page=${selectedPage + 1}`);

    setPrevPage(selectedPage);
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
