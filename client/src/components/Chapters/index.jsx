import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { useParams } from 'react-router-dom';
import PaginationButtons from '../PaginationButtons';
import Volumes from './Volumes';
import { usePagination, useLoading } from '../../hooks';
import CONSTANTS from '../../constants';
const { DEFAULT_LOCALE } = CONSTANTS;

const limit = 20;

const Chapters = () => {
  const { chapters, total, isFetching } = useSelector(({ chapters }) => chapters);
  const { getChapters } = bindActionCreators(actionCreators, useDispatch());
  const { mangaId } = useParams();

  const queryParams = { mangaId, lang: DEFAULT_LOCALE };
  usePagination({ actionCreator: getChapters, queryParams, limit });

  const loading = useLoading({ data: chapters, title: 'No Chapters', isFetching });
  if (loading) return loading;

  return (
    <>
      <Volumes />
      <PaginationButtons itemCount={total} limit={limit} />
    </>
  );
};

export default Chapters;
