import React from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import { BsPeopleFill as GroupIcon } from 'react-icons/bs';
import { selectRelationship } from '../../../common/functions';
import CreatorAnchor from '../../Chapters/CreatorAnchor';
import InputPage from '../InputPage';
import MenuButton from '../MenuButton';
import styles from './InfoPanel.module.scss';
import CONSTANTS from '../../../constants.js';
const { DEFAULT_LOCALE, TITLE_TABS: { chapters } } = CONSTANTS;

const InfoPanel = (props) => {
  const { currentPage, pageCount } = props;
  const { theme: { bgTheme, hoveredTheme } } = useSelector(({ themes }) => themes);
  const { chapter, isFetching } = useSelector(({ chapter }) => chapter);

  const blocksClasses = cx(
    bgTheme,
    'me-1 ms-1 p-1 rounded-2',
    'd-flex justify-content-center align-items-center flex-wrap'
  );

  const subHeaderClasses = cx(
    styles.sub_header,
    hoveredTheme,
  );

  if (isEmpty(chapter) || isFetching) {
    return <Spinner animation='border' role='status'></Spinner>;
  }

  const {
    attributes: { title: chapterTitle, volume: volumeNum, chapter: chapterNum },
    relationships,
  } = chapter;
  const { id, attributes: { title: mangaTitle } } = selectRelationship(relationships, 'manga');

  return (
    <>
      <Row className='m-auto'>
        <Col><h2 className='m-0'>{chapterTitle || `Chapter ${chapterNum}`}</h2></Col>
      </Row>
      <Row className='mb-3 m-auto'>
        <Col>
          <Link to={`/title/${id}?tab=${chapters}`} className={subHeaderClasses}>
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
          Page:
          <InputPage page={currentPage + 1} pageCount={pageCount} className='pe-1' />
          /
          <span className='ps-1'>{pageCount}</span>
        </Col>
        <Col xs='2' md='3' className={blocksClasses}><MenuButton /></Col>
      </Row>
    </>
  );
};

export default InfoPanel;
