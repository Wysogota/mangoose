import React from 'react';
import ChaptersList from '../ChaptersList';
import styles from './Volumes.module.scss';

const VolumeChapters = (props) => {
  const { chapters, volumeName } = props;

  const getChaptersList = () => [...new Set(
    chapters.data
      .filter(({ attributes: { volume } }) => volume === volumeName)
      .map(({ attributes: { chapter } }) => chapter)
  )];

  return getChaptersList().map((volumeChapter) =>
  (<div key={volumeChapter} className='mb-2'>
    <h5 className={styles.chapter_header}>Chapter {volumeChapter}</h5>
    <ChaptersList chapters={chapters} volumeChapter={volumeChapter} />
  </div>));
};

export default VolumeChapters;