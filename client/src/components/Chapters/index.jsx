import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import PaginationButtons from '../PaginationButtons';
import Volumes from './Volumes';
import { usePagination, useCheckingEmptyValues } from '../../hooks';
import CONSTANTS from '../../constants';
const { DEFAULT_LOCALE } = CONSTANTS;

const limit = 20;

const Chapters = (props) => {
  const { mangaId } = props;
  const { chapters, isFetching } = useSelector(({ chapters }) => chapters);
  const { getChapters } = bindActionCreators(actionCreators, useDispatch());

  const queryParams = { mangaId, lang: DEFAULT_LOCALE };
  usePagination({ actionCreator: getChapters, queryParams, limit });

  const emptyTab = useCheckingEmptyValues(chapters.data, 'No Chapters', isFetching);
  if (emptyTab) return emptyTab;

  return (
    <>
      <Volumes chapters={chapters} />
      <PaginationButtons itemCount={chapters.total} limit={limit} />
    </>
  );
};

export default Chapters;
