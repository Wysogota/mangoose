import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Dropdown } from 'react-bootstrap';
import { capitalize } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import cx from 'classnames';
import Order from '../Order';
import styles from './Sort.module.scss';
import CONSTANTS from '../../../constants';
import { getObjectFromArray } from '../../../common/functions';
const {
  SORT_LIST, SORT_LIST: { RELEVANCE: { type: RELEVANCE_TYPE } },
  PARAM_NAME: { FILTER: { SORT } },
  SORT_DIRECTION: { DESC }
} = CONSTANTS;
const SORT_LIST_VALUES = Object.values(SORT_LIST);

const Sort = () => {
  const { theme: { outlineColor, invertedColor, bgInvertedAccentTheme, invertedTheme } } = useSelector(({ themes }) => themes);
  const [eventKey, setEventKey] = useState(RELEVANCE_TYPE);
  const [searchParams, setSearchParams] = useSearchParams();
  const paramOrder = searchParams.get(SORT)?.split('.')[1];
  const [order, setOrder] = useState(paramOrder || DESC);

  useEffect(() => {
    const sortParam = searchParams.get(SORT);
    if (sortParam) setEventKey(sortParam.split('.')[0]);
  }, [searchParams]);

  const onClickHandle = (type) => {
    type === RELEVANCE_TYPE
      ? searchParams.set(SORT, type)
      : searchParams.set(SORT, `${type}.${order}`);
    setSearchParams(searchParams, { replace: true });
  };

  const selectedItemClasses = (type) => {
    const sortParam = searchParams.get(SORT);
    if (sortParam) {
      const paramName = sortParam.split('.')[0];
      if (paramName === type) return cx(bgInvertedAccentTheme, invertedTheme);
    }
  };

  return (
    <Dropdown className='d-inline-block' autoClose='outside'>
      <Dropdown.Toggle className='d-flex align-items-center p-1 pe-2' variant={outlineColor}>
        <div className='pe-4 text-start'>
          <div className={styles.header}>Sort By</div>
          <div>{capitalize(getObjectFromArray(SORT_LIST_VALUES, 'type', eventKey).name)}</div>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu variant={invertedColor}>
        {SORT_LIST_VALUES.map(({ name, type }) =>
          <Dropdown.Item
            key={type} eventKey={type}
            onClick={() => onClickHandle(type)}
            className={selectedItemClasses(type)}
          >
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
