import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { capitalize } from 'lodash';
import { useSearchParams } from 'react-router-dom';

const orderStates = {
  asc: 'asc',
  desc: 'desc',
};

const sortItems = [
  {
    name: 'best match',
    type: 'relevance',
  },
  {
    name: 'upload time',
    type: 'latestUploadedChapter',
  },
  {
    name: 'title',
    type: 'title',
  },
  {
    name: 'rating',
    type: 'rating',
  },
  {
    name: 'followed count',
    type: 'followedCount',
  },
  {
    name: 'added',
    type: 'createdAt',
  },
  {
    name: 'year',
    type: 'year',
  },
];

const Sort = () => {
  const { theme: { outlineColor, invertedColor } } = useSelector(({ themes }) => themes);
  const [order, setOrder] = useState(orderStates.desc);
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickHandle = (type) => {
    searchParams.set('order', `${type}.${order}`);
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <Dropdown className='d-inline-block'>
      <Dropdown.Toggle className='d-flex align-items-center p-1 pe-2' variant={outlineColor}>
        <div className='pe-4 text-start'>
          <div style={{ fontSize: '0.7rem' }}>Sort By</div>
          <div>Something else</div>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu variant={invertedColor}>
        {sortItems.map(({ name, type }) =>
          <Dropdown.Item key={type} onClick={() => onClickHandle(type)}>{capitalize(name)}</Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Sort;
