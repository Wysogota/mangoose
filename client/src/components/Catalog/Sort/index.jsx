import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { capitalize } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import Order from '../Order';
import CONSTANTS from '../../../constants';
const { SORT_LIST, PARAM_NAME: { FILTER: { SORT } }, SORT_DIRECTION: { ASC } } = CONSTANTS;

const Sort = () => {
  const { theme: { outlineColor, invertedColor } } = useSelector(({ themes }) => themes);
  const [order, setOrder] = useState(ASC);
  const [eventKey, setEventKey] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const sortParam = searchParams.get(SORT);
    if (sortParam) {
      setEventKey(SORT_LIST.findIndex(({ type }) => type === sortParam.split('.')[0]));
    }
  }, [searchParams]);

  const onClickHandle = (type) => {
    type === SORT_LIST[0].type
      ? searchParams.set(SORT, type)
      : searchParams.set(SORT, `${type}.${order}`);
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
        <Dropdown.Divider />
        <Order setOrder={setOrder} />
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default Sort;
