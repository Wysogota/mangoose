import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames'
import ChaptersList from '../ChaptersList';
import styles from './Volumes.module.scss';

const VolumeChapters = (props) => {
  const { chapters, volumeName } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);

  const innerContainerClasses = cx(
    styles.inner_chapters,
    styles[`inner_chapters-${mainColor}`],
    'rounded-bottom-2',
  )

  const getChaptersList = () => [...new Set(
    chapters.data
      .filter(({ attributes: { volume } }) => volume === volumeName)
      .map(({ attributes: { chapter } }) => chapter)
  )];

  return getChaptersList().map((volumeChapter) =>
  (<div key={volumeChapter} className='mb-2'>
    <h5 className={styles.chapter_header}>Chapter {volumeChapter}</h5>
    <div className={innerContainerClasses}>
      <ChaptersList chapters={chapters} volumeChapter={volumeChapter} />
    </div>

  </div>));
};

export default VolumeChapters;