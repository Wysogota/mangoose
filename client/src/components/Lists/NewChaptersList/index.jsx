import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import cx from 'classnames';
import { useAdaptiveView } from '../../../hooks';
import styles from './NewChaptersList.module.scss';
import CONSTANTS from '../../../constants';
const {
  breakpoints: { lg },
  PAGES: { CHAPTER_READER: { path: CHAPTER_PATH } },
  DEFAULT_NEW_CHAPTERS,
} = CONSTANTS;

const NewChaptersList = (props) => {
  const { extendedCatalog } = props;
  const { theme: { mainColor, bgAccentTheme, bgInvertedHoveredTheme } } = useSelector(({ themes }) => themes);
  const isAdaptiveView = useAdaptiveView(lg);

  const containerClasses = cx(
    isAdaptiveView ? styles.adaptive : styles.normal,
    bgAccentTheme,
    'flex-grow-1 rounded-2',
  );

  const groupClasses = cx(
    styles.group,
    !extendedCatalog || isAdaptiveView && 'h-100',
  );

  const itemClasses = cx(
    bgInvertedHoveredTheme,
    'p-0 h-100 border-0',
  );

  return (
    <div className={containerClasses}>
      <ListGroup className={groupClasses}>
        {DEFAULT_NEW_CHAPTERS(7).map(({ id, chapter, manga, date }) =>
          <ListGroup.Item key={id} variant={mainColor} className={itemClasses}>
            <Link to={`${CHAPTER_PATH}/${id}`} className='d-block p-2'>
              <h5>{chapter}</h5>
              <h6 className='m-0'>{manga}</h6>
              <time className={styles.date}>{date}</time>
              <hr className='mb-0 mt-3' />
            </Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default NewChaptersList;
