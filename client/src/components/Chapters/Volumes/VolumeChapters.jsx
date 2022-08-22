import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import ChaptersList from '../ChaptersList';
import styles from './Volumes.module.scss';

const VolumeChapters = (props) => {
  const { volumeName } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);
  const { chapters } = useSelector(({ chapters }) => chapters);

  const innerContainerClasses = cx(
    styles.inner_chapters,
    styles[`inner_chapters-${mainColor}`],
    'rounded-bottom-2',
  );

  const getChaptersList = () => [...new Set(
    chapters
      .filter(({ attributes: { volume } }) => volume === volumeName)
      .map(({ attributes: { chapter } }) => chapter)
  )];

  return getChaptersList().map((chapter) => (
    <div key={chapter} className='mb-2'>
      <h5 className={styles.chapter_header}>Chapter {chapter}</h5>
      <div className={innerContainerClasses}>
        <ChaptersList volumeChapter={chapter} />
      </div>
    </div>
  ));
};

VolumeChapters.propTypes = {
  volumeName: PropTypes.string,
};

export default VolumeChapters;