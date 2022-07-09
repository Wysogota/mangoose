import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CONSTANTS from '../constants';
const { PARAM_NAME: { PAGE } } = CONSTANTS;

const usePagination = (options) => {
  const { actionCreator, queryOptions, limit } = options;
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    actionCreator(queryOptions({
      offset: limit * currentPage
    }));
  }, [currentPage]);

  useEffect(() => {
      if (!searchParams.get(PAGE)) {
        setSearchParams({
          [PAGE]: currentPage + 1
        });
      }

    const pageValue = Number.parseInt(searchParams.get(PAGE)) - 1;
    setCurrentPage(pageValue || 0);
  }, [searchParams]);

  return { currentPage, setCurrentPage };
};

export default usePagination;
