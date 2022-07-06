import React from 'react';
import cx from 'classnames';
import { BsBoxArrowUpRight as ExternalLinkIcon } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styles from './ChaptersList.module.scss';

const linkClasses = cx(
  styles.link_title,
  'col-6'
);

export const ExternalChapterLink = (props) => {
  const { externalUrl, chapter } = props;
  return (
    <a href={externalUrl} target='_blank' rel='noreferrer' className={linkClasses}>
      <ExternalLinkIcon /><span className='ms-2'>ch. {chapter}</span>
    </a>
  );
};

export const ChapterLink = (props) => {
  const { title, pages } = props;
  return (
    <Link to='#' className={linkClasses}>
      <div className={styles.link_title}>{title}</div>
      <div className={styles.pages}>pages: {pages}</div>
    </Link >
  );
};