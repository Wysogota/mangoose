import React from 'react';
import { useSelector } from 'react-redux';
import { formatDistanceToNow } from 'date-fns';
import cx from 'classnames';
import { BsPersonFill as UserIcon, BsPeopleFill as GroupIcon } from 'react-icons/bs';
import { ChapterLink, ExternalChapterLink } from './ChapterLinks';
import CreatorAnchor from '../CreatorAnchor';
import { useAdaptiveView } from '../../../hooks';
import styles from './ChaptersList.module.scss';
import CONSTANTS from '../../../constants';
const { breakpoints: { md } } = CONSTANTS;

const ChaptersList = (props) => {
  const { chapters, volumeChapter } = props;
  const { theme: { bgHoveredTheme } } = useSelector(({ themes }) => themes);

  const isAdaptiveView = useAdaptiveView(md);
  const getDateValue = (publishAt) => formatDistanceToNow(new Date(publishAt));

  const chapterLinkClasses = 'col-6';

  const constainerClasses = cx(
    styles.container,
    bgHoveredTheme,
    'p-2 d-flex justify-content-between text-nowrap rounded-2',
  );

  const creatorClasses = cx(
    styles.creator,
    isAdaptiveView ? 'd-flex justify-content-between' : 'col-3',
  );

  const CreatorAnchors = ({ relationships }) => (
    <div className={creatorClasses}>
      <CreatorAnchor relationships={relationships} type='user' Icon={UserIcon} />
      <CreatorAnchor relationships={relationships} type='group' Icon={GroupIcon} />
    </div>
  );

  const PublishDate = ({ publishAt, className }) => (
    <time dateTime={publishAt} className={className}>
      {getDateValue(publishAt)}
    </time>
  );

  return (chapters.data
    .filter(({ attributes: { chapter } }) => chapter === volumeChapter)
    .map(({ id, attributes: { title, chapter, externalUrl, pages, publishAt }, relationships }) => {
      return (
        <div key={id} className={constainerClasses}>
          {externalUrl
            ? <ExternalChapterLink className={chapterLinkClasses} externalUrl={externalUrl} chapter={chapter} />
            : <ChapterLink className={chapterLinkClasses} chapterId={id} title={title} pages={pages} />}

          {isAdaptiveView
            ? (<div className='col-6 d-flex justify-content-end flex-column text-end'>
              <PublishDate publishAt={publishAt} />
              <CreatorAnchors relationships={relationships} />
            </div>)
            : (<>
              <CreatorAnchors relationships={relationships} />
              <PublishDate
                publishAt={publishAt}
                className='col-3 d-flex justify-content-end text-end'
              />
            </>)}

        </div>
      );
    }));
};

export default ChaptersList;
