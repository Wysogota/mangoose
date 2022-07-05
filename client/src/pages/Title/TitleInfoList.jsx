import React from 'react';
import cx from 'classnames';
import { useSelector } from 'react-redux';
import InfoItem from '../../components/Title/InfoItem';

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
      <InfoItem title='author' value={authorName} inline={inline} />
      <InfoItem title='artist' value={atristName} inline={inline} />
      <InfoItem title='Demographic' value={publicationDemographic} inline={inline} />
      <InfoItem title='release year' value={year} inline={inline} />
      <InfoItem title='status' value={status} inline={inline} />
      {status === 'completed' && <InfoItem title='last chapter' value={lastChapter} inline={inline} />}
    </div>
  );
};

export default TitleDescription;
