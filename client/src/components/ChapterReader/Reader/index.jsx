import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Carousel, Spinner } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { selectRelationship } from '../../../common/functions';
import styles from './Reader.module.scss';
import './reader.scss';

const Reader = (props) => {
  const [_, setSearchParams] = useSearchParams();
  const { chapterPages, currentPage } = props;

  const { chapter } = useSelector(({ chapter }) => chapter);
  const { nextChapterId, isFetching } = useSelector(({ nextChapterId }) => nextChapterId);
  const { getNextChapterId } = bindActionCreators(actionCreators, useDispatch());

  const [prevPage, setPrevPage] = useState(currentPage);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpty(chapter)) {
      const {
        manga: { id: mangaId },
        scanlation_group: { id: groupId }
      } = selectRelationship(chapter.relationships, ['manga', 'scanlation_group']);

      getNextChapterId({
        mangaId,
        groupId,
        chapter: chapter.attributes.chapter,
      });
    }
  }, [chapter]);

  const handleSelect = (selectedPage, e) => {
    const pagesCount = chapterPages.data.length - 1;
    const { prev, next } = nextChapterId;
    const mangaId = selectRelationship(chapter.relationships, 'manga').id;

    const chooseNavigate = (navigeChapter) => navigeChapter
      ? navigate(`/chapter/${navigeChapter}`)
      : navigate(`/title/${mangaId}`);

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

  if (!nextChapterId || isFetching) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

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
