import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import cx from 'classnames';
import styles from './NewsList.module.scss';
import CONSTANTS from '../../../constants';
const {
  PAGES: { NEWS: { path: NEWS_PATH } },
  DEFAULT_NEWS,
} = CONSTANTS;

const NewsList = () => {
  const { theme: { mainColor, bgAccentTheme, bgInvertedHoveredTheme } } = useSelector(({ themes }) => themes);

  const containerClasses = cx(
    styles.container,
    bgAccentTheme,
    'flex-grow-1 rounded-2',
  );

  const groupClasses = cx(
    styles.group,
    'h-100',
  );

  const itemClasses = cx(
    bgInvertedHoveredTheme,
    'p-0',
  );

  return (
    <div className={containerClasses}>
      <ListGroup className={groupClasses}>
        {DEFAULT_NEWS(8).map(({ id, title, date }) =>
          <ListGroup.Item key={id} variant={mainColor} className={itemClasses}>
            <Link to={`${NEWS_PATH}/${id}`} className='d-flex justify-content-between p-2'>
              <h6>{title}</h6>
              <time className={styles.date}>{date}</time>
            </Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default NewsList;
