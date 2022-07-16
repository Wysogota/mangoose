import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CONSTANTS from '../constants';
const { PARAM_NAME: { PAGE, FILTER: { TAGS }, FILTER } } = CONSTANTS;

const usePagination = (options) => {
  const { actionCreator, queryParams, limit } = options;
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [existedParams, setExistedParams] = useState([]);

  useEffect(() => {
    actionCreator(Object.assign(
      queryParams,
      { limit, offset: limit * currentPage },
    ));
  }, [currentPage]);

  useEffect(() => {
    const paramValues = Object
      .values(FILTER)
      .map((param) => [param, searchParams.getAll(param)])
      .filter(([, value]) => !isEmpty(value));
      
    if (!isEmpty(paramValues)) {
      setExistedParams(paramValues.map(([key, value]) => [`${key}=${value}`]));
    }

    const pageValue = Number.parseInt(searchParams.get(PAGE)) - 1;
    setCurrentPage(pageValue || 0);
  }, [searchParams]);

  return { currentPage, setCurrentPage, existedParams };
};

export default usePagination;
