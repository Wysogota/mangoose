import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import CONSTANTS from '../constants';
const { PARAM_NAME: { page } } = CONSTANTS;

const usePagination = (options) => {
  const { actionCreator, queryOptions, mangaId, paramName, tabParamValue, limit } = options;
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [existedParams, setExistedParams] = useState([]);
  const [isSameTab, setIsSameTab] = useState();

  useEffect(() => {
    actionCreator(queryOptions({
      mangaId: mangaId,
      offset: limit * currentPage
    }));
  }, [currentPage]);

  useEffect(() => {
    const paramValue = searchParams.get(paramName);
    if (paramValue && paramValue === tabParamValue) {
      setIsSameTab(true);
      setExistedParams([`${paramName}=${paramValue}`]);
      if (!searchParams.get(page)) {
        setSearchParams({
          [paramName]: paramValue,
          [page]: isSameTab ? currentPage + 1 : 1
        });
      }
    } else {
      setIsSameTab(false);
    }

    const pageValue = Number.parseInt(searchParams.get(page)) - 1;
    setCurrentPage(pageValue || 0);
  }, [searchParams]);

  return { currentPage, setCurrentPage, existedParams };
};

export default usePagination;
