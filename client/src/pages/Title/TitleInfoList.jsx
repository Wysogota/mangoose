import React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import InfoItem from '../../components/Title/InfoItem';

const TitleDescription = (props) => {
  const { status, lastChapter, publicationDemographic, year, authorName, atristName } = props.attributes;
  const { theme: { bgAccentTheme } } = useSelector(({ themes }) => themes);

  const containerClasses = cx(
    bgAccentTheme,
    'pt-3 pb-3 rounded'
  );

  return (
    <div className={containerClasses}>
      <InfoItem title='author' value={authorName} />
      <InfoItem title='artist' value={atristName} />
      {status === 'completed' && <InfoItem title='last chapter' value={lastChapter} />}
      <InfoItem title='Demographic' value={publicationDemographic} />
      <InfoItem title='status' value={status} />
      <InfoItem title='release year' value={year} />
    </div>
  );
};

export default TitleDescription;
