import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import { BsCaretDownFill as ASCIcon, BsCaretUpFill as DESCIcon } from 'react-icons/bs';
import { getObjectFromArray } from '../../../common/functions';
import CONSTANTS from '../../../constants';
const { SORT_DIRECTION: { ASC, DESC }, PARAM_NAME: { FILTER: { SORT } }, SORT_LIST } = CONSTANTS;

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

      const relevance = getObjectFromArray(SORT_LIST, 'type', 'relevance');
      if (sort !== relevance.type) {
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
