import React from 'react';
import cx from 'classnames';
import { BsBoxArrowUpRight as ExternalLinkIcon } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import styles from './ChaptersList.module.scss';

export const ExternalChapterLink = (props) => {
  const { externalUrl, chapter, className } = props;
  const linkClasses = cx(
    styles.link_title,
    className,
  );

  return (
    <a href={externalUrl} target='_blank' rel='noreferrer' className={linkClasses}>
      <ExternalLinkIcon /><span className='ms-2'>ch. {chapter}</span>
    </a>
  );
};

export const ChapterLink = (props) => {
  const { chapterId, title, pages, className } = props;
  const linkClasses = cx(
    styles.link_title,
    className,
  );

  return (
    <Link to={`/chapter/${chapterId}`} className={linkClasses}>
      <div className={styles.link_title}>{title}</div>
      <div className={styles.pages}>pages: {pages}</div>
    </Link >
  );
};