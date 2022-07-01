import React from 'react';
import { useSelector } from 'react-redux';
import { capitalize } from 'lodash';
import { Button } from 'react-bootstrap';
import MinorHeader from '../../Headers/MinorHeader';
import CONSTANTS from '../../../constants';

const Tags = (props) => {
  const { data } = props;
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);

  const tagGroupNames = [...new Set(
    data.map(({ attributes: { group } }) => group)
  )];

  const getTagButtons = (tag) => data
    .filter(({ attributes: { group } }) => group === tag)
    .map(({ attributes: { name } }) => {
      const localeName = name[CONSTANTS.DEFAULT_LOCALE];
      return <Button key={localeName} variant={invertedColor} className='p-1 me-3 mb-3'>{localeName}</Button>;
    });

  const getTagGroups = () => tagGroupNames.map((tag) =>
    <div key={tag} >
      <MinorHeader className='me-3'>{capitalize(tag)}</MinorHeader>
      <div>{getTagButtons(tag)}</div>
    </div>
  );

  return (
    <div className='d-flex flex-wrap'>{getTagGroups()}</div>
  );
};

export default Tags;
