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
const { SORT_LIST, PARAM_NAME: { FILTER: { SORT } }, SORT_DIRECTION: { ASC } } = CONSTANTS;

const Sort = () => {
  const { theme: { outlineColor, invertedColor, bgInvertedAccentTheme, invertedTheme } } = useSelector(({ themes }) => themes);
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
    const relevance = getObjectFromArray(SORT_LIST, 'type', 'relevance');
    type === relevance.type
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
      <Dropdown.Toggle className='d-flex align-items-center p-1 pe-2 shadow-none' variant={outlineColor}>
        <div className='pe-4 text-start'>
          <div className={styles.header}>Sort By</div>
          <div>{capitalize(SORT_LIST[eventKey].name)}</div>
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu variant={invertedColor}>
        {SORT_LIST.map(({ name, type }, i) =>
          <Dropdown.Item
            key={type} eventKey={i}
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
