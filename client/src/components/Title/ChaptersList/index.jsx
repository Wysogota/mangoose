import React from 'react';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import cx from 'classnames';
import { BsPersonFill as UserIcon, BsPeopleFill as GroupIcon } from 'react-icons/bs';
import { ChapterLink, ExternalChapterLink } from './ChapterLinks';
import CreatorAnchor from './CreatorAnchor';
import styles from './ChaptersList.module.scss';

const Chapters = (props) => {
  const { chapters, volumeChapter } = props;
  const { theme: { bgHoveredTheme } } = useSelector(({ themes }) => themes);

  const getDateValue = (publishAt) => formatDistanceToNow(new Date(publishAt));

  const constainerClasses = cx(
    styles.container,
    bgHoveredTheme,
    'p-2 d-flex justify-content-between text-nowrap rounded-2',
  );

  const creatorClasses = cx(
    styles.creator,
    'col-4'
  );

  return (chapters.data
    .filter(({ attributes: { chapter } }) => chapter === volumeChapter)
    .map(({ id, attributes: { title, chapter, externalUrl, pages, publishAt }, relationships }) => {
      return (
        <div key={id} className={constainerClasses}>
          {externalUrl
            ? <ExternalChapterLink externalUrl={externalUrl} chapter={chapter} />
            : <ChapterLink title={title} pages={pages} />
          }

          <div className={creatorClasses}>
            <CreatorAnchor relationships={relationships} type='user' Icon={UserIcon} />
            <CreatorAnchor relationships={relationships} type='group' Icon={GroupIcon} />
          </div>

          <time dateTime={publishAt} className='col-2 d-flex justify-content-end text-end'>
            {getDateValue(publishAt)}
          </time>
        </div >
      );
    }));
};

export default Chapters;
