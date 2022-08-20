import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ListGroup } from 'react-bootstrap';
import cx from 'classnames';
import styles from './NewsList.module.scss';

const data = [
  {
    title: 'Cras justo odio',
    href: '#',
    date: '23 june 2022',
  },
  {
    title: 'Dapibus ac facilisis in',
    href: '#',
    date: '23 june 2022',
  },
  {
    title: 'Morbi leo risus',
    href: '#',
    date: '23 june 2022',
  },
  {
    title: 'Porta ac consectetur ac',
    href: '#',
    date: '23 june 2022',
  },
  {
    title: 'Cras justo odio',
    href: '#',
    date: '21 june 2022',
  },
];

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
        {data.map(({ title, href, date }) =>
          <ListGroup.Item key={title + date} variant={mainColor} className={itemClasses}>
            <Link to={href} target='_blank' className='d-flex justify-content-between p-2'>
              <div>{title}</div>
              <div className={styles.date}>{date}</div>
            </Link>
          </ListGroup.Item>
        )}
      </ListGroup>
    </div>
  );
};

export default NewsList;
