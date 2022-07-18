import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { capitalize } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import CONSTANTS from '../../../constants';
const { SORT_LIST, PARAM_NAME: { FILTER: { SORT } }, SORT_DIRECTION } = CONSTANTS;

const Sort = () => {
  const { theme: { outlineColor, invertedColor } } = useSelector(({ themes }) => themes);
  const [order, setOrder] = useState(SORT_DIRECTION.DESC);
  const [eventKey, setEventKey] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sort = searchParams.get(SORT);
    if (sort) setEventKey(SORT_LIST.findIndex(({ type }) => type === sort.split('.')[0]));
  }, [searchParams]);

  const onClickHandle = (type) => {
    type
      ? searchParams.set(SORT, `${type}.${order}`)
      : searchParams.delete(SORT);
    setSearchParams(searchParams, { replace: true });
  };

  return (
    <Dropdown className='d-inline-block' >
      <Dropdown.Toggle className='d-flex align-items-center p-1 pe-2' variant={outlineColor}>
        <div className='pe-4 text-start'>
          <div style={{ fontSize: '0.7rem' }}>Sort By</div>
          <div>{capitalize(SORT_LIST[eventKey].name)}</div>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu variant={invertedColor}>
        {SORT_LIST.map(({ name, type }, i) =>
          <Dropdown.Item key={type} onClick={() => onClickHandle(type)} eventKey={i}>
            {capitalize(name)}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Sort;
