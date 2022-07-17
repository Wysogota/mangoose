import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import CONSTANTS from '../constants';
const { PARAM_NAME: { PAGE } } = CONSTANTS;

const usePagination = (options) => {
  const { actionCreator, queryParams, limit } = options;
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentPage = (Number.parseInt(searchParams.get(PAGE)) - 1) || 0;

    actionCreator(Object.assign(
      queryParams,
      { limit, offset: limit * currentPage },
    ));
  }, [searchParams]);
};

export default usePagination;
