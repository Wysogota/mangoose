import React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import InfoItem from '../../components/Title/InfoItem';
import CONSTANTS from '../../constants';
const {
  PAGES: { CATALOG: { path } },
  PARAM_NAME: { FILTER: { AUTHOR, ARTIST } },
} = CONSTANTS;

const TitleDescription = (props) => {
  const { className, inline } = props;
  const { status, lastChapter, publicationDemographic, year, authorName, atristName } = props.attributes;
  const { theme: { bgAccentTheme } } = useSelector(({ themes }) => themes);

  const containerClasses = cx(
    className,
    bgAccentTheme,
    'pt-3 pb-3 rounded',
  );

  return (
    <div className={containerClasses}>
      <InfoItem to={`${path}?${AUTHOR}=${authorName}`} title='author' value={authorName} inline={inline} />
      <InfoItem to={`${path}?${ARTIST}=${atristName}`} title='artist' value={atristName} inline={inline} />
      <InfoItem to={'#'} title='Demographic' value={publicationDemographic} inline={inline} />
      <InfoItem to={'#'} title='release year' value={year} inline={inline} />
      <InfoItem to={'#'} title='status' value={status} inline={inline} />
      {status === 'completed' &&
        <InfoItem to={'#'} title='last chapter' value={lastChapter} inline={inline} />
      }
    </div>
  );
};

export default TitleDescription;
