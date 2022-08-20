import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import cx from 'classnames';
import { useAdaptiveView } from '../../../hooks';
import styles from './NewChaptersList.module.scss';
import CONSTANTS from '../../../constants';
const { breakpoints: { lg } } = CONSTANTS;

const data = [
  {
    chapter: 'Cras justo odio',
    manga: 'Attack on titan',
    href: '#',
    date: '23 june 2022',
  },
  {
    chapter: 'Dapibus ac facilisis in',
    manga: 'Attack on titan',
    href: '#',
    date: '23 june 2022',
  },
  {
    chapter: 'Morbi leo risus',
    manga: 'Attack on titan',
    href: '#',
    date: '23 june 2022',
  },
  {
    chapter: 'Porta ac consectetur ac',
    manga: 'Attack on titan',
    href: '#',
    date: '23 june 2022',
  },
  {
    chapter: 'Cras justo odio',
    manga: 'Attack on titan',
    href: '#',
    date: '21 june 2022',
  },
];

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
        {data.map(({ chapter, manga, href, date }) =>
          <ListGroup.Item key={chapter + date} variant={mainColor} className={itemClasses}>
            <Link to={href} target='_blank' className='d-block p-2'>
              <div className='fs-5'>{chapter}</div>
              <div>{manga}</div>
              <div className={styles.date}>{date}</div>
              <hr className='mb-0 mt-3' />
            </Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default NewChaptersList;
