import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Row, Col, Spinner } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import cx from 'classnames';
import { isEmpty } from 'lodash';
import { BsPeopleFill as GroupIcon } from 'react-icons/bs';
import { selectRelationship } from '../../../common/functions';
import CreatorAnchor from '../../Title/ChaptersList/CreatorAnchor';
import styles from './InfoPanel.module.scss';
import CONSTANTS from '../../../constants.js';

const InfoPanel = (props) => {
  const { currentPage, pageCount } = props;
  const { theme: { bgTheme, hoveredTheme } } = useSelector(({ themes }) => themes);
  const { chapterId } = useParams();

  const { chapter, isFetching } = useSelector(({ chapter }) => chapter);
  const { getChapter } = bindActionCreators(actionCreators, useDispatch());
  const { getNextChapterId } = bindActionCreators(actionCreators, useDispatch());

  useEffect(() => getChapter({ chapterId }), [chapterId]);

  useEffect(() => {
    if (!isEmpty(chapter)) {
      const {
        manga: { id: mangaId },
        scanlation_group: { id: groupId }
      } = selectRelationship(chapter.relationships, ['manga', 'scanlation_group']);

      getNextChapterId({
        mangaId,
        groupId,
        chapter: Number.parseInt(chapter.attributes.chapter) + 1,
      });
    }
  }, [chapter]);

  const blocksClasses = cx(
    bgTheme,
    'me-1 ms-1 p-1 text-center rounded-2'
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
      <Row className='mb-2'>
        <Col>
          <h2 className='m-0'>{chapterTitle}</h2>
          <Link to={`/title/${id}`} className={subHeaderClasses}>
            {mangaTitle[CONSTANTS.DEFAULT_LOCALE]}
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
      <Row>
        <Col className={blocksClasses}>Vol.{volumeNum}, Ch.{chapterNum}</Col>
        <Col className={blocksClasses}>Page: {currentPage + 1} / {pageCount}</Col>
        <Col className={blocksClasses}></Col>
      </Row>
    </>
  );
};

export default InfoPanel;
