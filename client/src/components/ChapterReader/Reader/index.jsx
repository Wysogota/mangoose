import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { selectRelationship } from '../../../common/functions';
import styles from './Reader.module.scss';
import './reader.scss';

const Reader = (props) => {
  const [_, setSearchParams] = useSearchParams();
  const { chapterPages, currentPage } = props;
  const { chapter } = useSelector(({ chapter }) => chapter);
  const { nextChapterId } = useSelector(({ nextChapterId }) => nextChapterId);
  const [prevPage, setPrevPage] = useState(currentPage);
  const navigate = useNavigate();

  const handleSelect = (selectedPage, e) => {

    const pagesCount = chapterPages.data.length - 1;
    const { prev, next } = nextChapterId;
    const mangaId = selectRelationship(chapter.relationships, 'manga').id;

    const chooseNavigate = (navigeChapter) =>
      navigeChapter ? navigate(`/chapter/${navigeChapter}`) : navigate(`/title/${mangaId}`);

    if (selectedPage === 0 && prevPage === pagesCount) {
      chooseNavigate(next);
    } else if (prevPage === 0 && selectedPage === pagesCount) {
      chooseNavigate(prev);
    } else {
      setSearchParams(`?page=${selectedPage + 1}`);
    }

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
