import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CONSTANTS from '../constants';
const { PARAM_NAME: { PAGE } } = CONSTANTS;

/**
 * Load current page data from server
 * @param {{actionCreator:function, queryParams:object, limit:int}} options 
 * @param {Array<string>} params 
 * @param {string} paginationName 
 */
const usePagination = (options, params = [], paginationName) => {
  const { actionCreator, queryParams, limit } = options;
  const [searchParams] = useSearchParams();
  const paramName = paginationName ? `${paginationName}-${PAGE}` : PAGE;

  useEffect(() => {
    const currentPage = (Number.parseInt(searchParams.get(paramName)) - 1) || 0;

    actionCreator(Object.assign(
      queryParams,
      { limit, offset: limit * currentPage },
    ), ...params);
  }, [searchParams]);
};

export default usePagination;
