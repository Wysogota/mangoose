import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CONSTANTS from '../constants';
const { PARAM_NAME: { PAGE } } = CONSTANTS;

const usePagination = (options) => {
  const { actionCreator, queryParams, limit } = options;
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    actionCreator(Object.assign(
      queryParams,
      { limit, offset: limit * currentPage },
    ));
  }, [currentPage]);

  useEffect(() => {
    const pageValue = Number.parseInt(searchParams.get(PAGE)) - 1;
    setCurrentPage(pageValue || 0);
  }, [searchParams]);

  return { currentPage, setCurrentPage };
};

export default usePagination;
