import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { BsCaretDownFill as ASCIcon, BsCaretUpFill as DESCIcon } from 'react-icons/bs';
import CONSTANTS from '../../../constants';
const { SORT_DIRECTION: { ASC, DESC }, PARAM_NAME: { FILTER: { SORT } }, SORT_LIST: [RELEVANCE] } = CONSTANTS;

const Order = (props) => {
  const { setOrder } = props;
  const [direction, setDirection] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickHandle = () => {
    setDirection(current => !current);
    const sortParam = searchParams.get(SORT);
    if (sortParam) {
      const [sort, order] = searchParams.get(SORT).split('.');
      const newOrder = (order === ASC) ? DESC : ASC;
      setOrder(newOrder);
      if (sort !== RELEVANCE.type) {
        searchParams.set(SORT, `${sort}.${newOrder}`);
        setSearchParams(searchParams, { replace: true });
      }
    }
  };

  return (
    <Dropdown.Item onClick={onClickHandle}>
      {direction
        ? <><ASCIcon /><span>{ASC.toUpperCase()}</span></>
        : <><DESCIcon /><span>{DESC.toUpperCase()}</span></>
      }
    </Dropdown.Item>
  );
};

export default Order;
