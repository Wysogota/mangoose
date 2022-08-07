import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { BsCaretDownFill as DESCIcon, BsCaretUpFill as ASCIcon } from 'react-icons/bs';
import CONSTANTS from '../../../constants';
const {
  SORT_DIRECTION: { ASC, DESC },
  PARAM_NAME: { FILTER: { SORT } },
  SORT_LIST: { RELEVANCE: { type: RELEVANCE_TYPE } }
} = CONSTANTS;

const Order = (props) => {
  const { setOrder } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const paramOrder = searchParams.get(SORT)?.split('.')[1];
  const [direction, setDirection] = useState(paramOrder === ASC);

  const onClickHandle = () => {
    setDirection(current => !current);
    const newOrder = direction ? DESC : ASC;
    setOrder(newOrder);

    const sortParam = searchParams.get(SORT);
    if (sortParam) {
      const [sort] = searchParams.get(SORT).split('.');
      if (sort !== RELEVANCE_TYPE) {
        searchParams.set(SORT, `${sort}.${newOrder}`);
        setSearchParams(searchParams, { replace: true });
      }
    }
  };

  return (
    <Dropdown.Item onClick={onClickHandle}>
      {direction
        ? <><ASCIcon /><span className='ms-2'>Ascending</span></>
        : <><DESCIcon /><span className='ms-2'>Descending</span></>
      }
    </Dropdown.Item>
  );
};

export default Order;
