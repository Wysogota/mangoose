import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const VolumeChapters = (props) => {
  const { chapters, volumeName } = props;
  const { theme: { bgHoveredTheme } } = useSelector(({ themes }) => themes);

  return chapters.data
    .filter(({ attributes: { volume } }) => volume === volumeName)
    .map(({ id, attributes: { chapter, title } }) => {
      return <Link key={id} to='#' className={'d-block p-2 ' + bgHoveredTheme}>{title || 'externalLink'}</Link>;
    });
};

export default VolumeChapters;