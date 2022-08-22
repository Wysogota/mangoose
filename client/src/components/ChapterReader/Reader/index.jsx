import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { isEmpty } from 'lodash';
import { Carousel, Spinner } from 'react-bootstrap';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { selectRelationship } from '../../../common/functions';
import styles from './Reader.module.scss';
import './reader.scss';
import CONSTANTS from '../../../constants';
const {
  TITLE_TABS: { CHAPTERS: { type: CHAPTERS_TYPE } },
  PARAM_NAME: { TAB, PAGE },
  PAGES: {
    TITLE: { path: titlePath },
    CHAPTER_READER: { path: chapterPath }
  },
} = CONSTANTS;

const Reader = (props) => {
  const { currentPage } = props;
  const { chapter } = useSelector(({ chapter }) => chapter);
  const { nextChapterId } = useSelector(({ nextChapterId }) => nextChapterId);
  const { chapterPages, hash } = useSelector(({ chapterPages }) => chapterPages);
  const { getNextChapterId } = bindActionCreators(actionCreators, useDispatch());
  const [, setSearchParams] = useSearchParams();
  const [prevPage, setPrevPage] = useState(currentPage);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isEmpty(chapter)) {
      const { manga, scanlation_group } = selectRelationship(
        chapter.relationships,
        ['manga', 'scanlation_group']
      );

      getNextChapterId({
        mangaId: manga.id,
        groupId: scanlation_group?.id,
        chapter: chapter.attributes.chapter,
      });
    }
  }, [chapter]);

  const handleSelect = (selectedPage, e) => {
    const pagesCount = chapterPages.length - 1;
    const { prev, next } = nextChapterId;
    const mangaId = selectRelationship(chapter.relationships, 'manga').id;

    const chooseNavigate = (navigeChapter) => navigeChapter
      ? navigate(`${chapterPath}/${navigeChapter}`)
      : navigate(`${titlePath}/${mangaId}?${TAB}=${CHAPTERS_TYPE}`);

    if (selectedPage === 0 && prevPage === pagesCount) {
      chooseNavigate(next);
    } else if (prevPage === 0 && selectedPage === pagesCount) {
      chooseNavigate(prev);
    } else {
      setSearchParams({ [PAGE]: selectedPage + 1 }, { replace: true });
    }

    setPrevPage(selectedPage);
    e.target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <Carousel id='reader'
      interval={null} indicators={false} nextIcon={null} prevIcon={null} slide={false}
      activeIndex={currentPage} onSelect={handleSelect}
    >
      {chapterPages.map(((image, i) =>
        <Carousel.Item key={i}>
          <img
            className={styles.image}
            src={`https://uploads.mangadex.org/data/${hash}/${image}`}
            alt={image}
          />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default Reader;
