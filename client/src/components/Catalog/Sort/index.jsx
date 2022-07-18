import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { capitalize } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import CONSTANTS from '../../../constants';
const { SORT, PARAM_NAME: { FILTER: { ORDER } } } = CONSTANTS;

const orderStates = {
  asc: 'asc',
  desc: 'desc',
};

const Sort = () => {
  const { theme: { outlineColor, invertedColor } } = useSelector(({ themes }) => themes);
  const [order, setOrder] = useState(orderStates.desc);
  const [eventKey, setEventKey] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickHandle = (type) => {
    type
      ? searchParams.set(ORDER, `${type}.${order}`)
      : searchParams.delete(ORDER);
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <Dropdown className='d-inline-block' onSelect={(key) => setEventKey(key)}>
      <Dropdown.Toggle className='d-flex align-items-center p-1 pe-2' variant={outlineColor}>
        <div className='pe-4 text-start'>
          <div style={{ fontSize: '0.7rem' }}>Sort By</div>
          <div>{capitalize(SORT[eventKey].name)}</div>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu variant={invertedColor}>
        {SORT.map(({ name, type }, i) =>
          <Dropdown.Item key={type} onClick={() => onClickHandle(type)} eventKey={i}>
            {capitalize(name)}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Sort;
