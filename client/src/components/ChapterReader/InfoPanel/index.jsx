import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import {
  BsPeopleFill as GroupIcon, BsCaretLeftFill as PrevIcon,
  BsCaretRightFill as NextIcon
} from 'react-icons/bs';
import { selectRelationship } from '../../../common/functions';
import CreatorAnchor from '../../Chapters/CreatorAnchor';
import InputPage from '../InputPage';
import MenuButton from '../MenuButton';
import styles from './InfoPanel.module.scss';
import CONSTANTS from '../../../constants.js';
const {
  DEFAULT_LOCALE,
  TITLE_TABS: { CHAPTERS: { type: CHAPTERS_TYPE } },
  PARAM_NAME: { TAB },
  PAGES: {
    TITLE: { path: titlePath },
    CHAPTER_READER: { path: chapterPath }
  },
} = CONSTANTS;

const InfoPanel = (props) => {
  const { currentPage } = props;
  const { theme: { bgTheme, hoveredTheme } } = useSelector(({ themes }) => themes);
  const { total } = useSelector(({ chapterPages }) => chapterPages);
  const { chapter, chapterIsFetching } = useSelector(({ chapter }) => chapter);
  const { nextChapterId, nextChapterIdIsFetching } = useSelector(({ nextChapterId }) => nextChapterId);

  const blocksClasses = cx(
    bgTheme,
    'me-1 ms-1 p-1 rounded-2',
    'd-flex justify-content-center align-items-center flex-wrap'
  );

  const subHeaderClasses = cx(
    styles.sub_header,
    hoveredTheme,
  );

  const disabledClasses = (id) => cx(
    !id && styles.diabled_control
  );

  const prevControlClasses = (id) => cx(
    styles.prev_chapter,
    hoveredTheme,
    disabledClasses(id),
  );

  const nextControlClasses = (id) => cx(
    styles.next_chapter,
    hoveredTheme,
    disabledClasses(id),
  );

  if (isEmpty(chapter) || !nextChapterId || chapterIsFetching || nextChapterIdIsFetching) {
    return <Spinner animation='border' role='status' />;
  }

  const {
    attributes: { title: chapterTitle, volume: volumeNum, chapter: chapterNum },
    relationships,
  } = chapter;
  const { id, attributes: { title: mangaTitle } } = selectRelationship(relationships, 'manga');
  const { prev, next } = nextChapterId;

  return (
    <>
      <Row className='m-auto'>
        <Col><h2 className='m-0'>{chapterTitle || `Chapter ${chapterNum || ''}`}</h2></Col>
      </Row>
      <Row className='mb-3 m-auto'>
        <Col>
          <Link to={`${titlePath}/${id}?${TAB}=${CHAPTERS_TYPE}`} className={subHeaderClasses}>
            {mangaTitle[DEFAULT_LOCALE]}
          </Link>
        </Col>
        <Col className='text-end align-self-end'>
          <CreatorAnchor
            className={subHeaderClasses}
            relationships={relationships}
            type='group'
            Icon={GroupIcon}
          />
        </Col>
      </Row>
      <Row className='m-auto'>
        <Col xs='2' md='3' className={blocksClasses}>
          <span className='ms-1 me-1'>Vol.{volumeNum},</span>
          <span className='ms-1 me-1'>Ch.{chapterNum}</span>
        </Col>
        <Col className={blocksClasses}>
          <Link to={`${chapterPath}/${prev}`} className={prevControlClasses(prev)}><PrevIcon /></Link>
          <div>
            Page:
            <InputPage page={currentPage + 1} className='pe-1' />
            /
            <span className='ps-1'>{total}</span>
          </div>
          <Link to={`${chapterPath}/${next}`} className={nextControlClasses(next)}><NextIcon /></Link>
        </Col>
        <Col xs='2' md='3' className={blocksClasses}><MenuButton /></Col>
      </Row>
    </>
  );
};

InfoPanel.propTypes = {
  currentPage: PropTypes.number.isRequired,
};

export default InfoPanel;
