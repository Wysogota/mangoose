import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import CONSTANTS from '../../../constants';

const TagButtons = (props) => {
  const { tags } = props;
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  return (
    tags
      .map(({ attributes: { name } }) => {
        const localeName = name[CONSTANTS.DEFAULT_LOCALE];
        return (
          <Button
            key={localeName}
            variant={invertedColor}
            className='p-1 me-2 mb-2'
            style={{ fontSize: '0.7rem', minWidth: '100px' }}
          >
            {localeName}
          </Button>
        );
      })
  );
};

export default TagButtons;
