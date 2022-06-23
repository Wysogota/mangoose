import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import cx from 'classnames';
import styles from './NewCharaptersList.module.scss';

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

const NewCharaptersList = () => {
  const { theme: { mainColor, bgInvertedHoveredTheme } } = useSelector(({ themes }) => themes);
  const itemClasses = cx(
    bgInvertedHoveredTheme,
    'p-0',
  );

  return (
    <ListGroup className={styles.group}>
      {data.map(({ chapter, manga, href, date }) =>
        <ListGroup.Item key={chapter + date} variant={mainColor} className={itemClasses}>
          <Link to={href} target='_blank' className='d-block p-2'>
            <div className='fs-5'>{chapter}</div>
            <div>{manga}</div>
            <div className={styles.date}>{date}</div>
          </Link>
        </ListGroup.Item>
      )}
    </ListGroup>
  );
};

export default NewCharaptersList;
