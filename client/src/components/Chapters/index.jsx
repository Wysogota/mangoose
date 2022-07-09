import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Col, Spinner } from 'react-bootstrap';
import PaginationButtons from '../PaginationButtons';
import Volumes from './Volumes';
import { useTabPagination, useCheckingEmptyValues } from '../../hooks';
import CONSTANTS from '../../constants';

const limit = 20;

const queryOptions = (options) => ({
  mangaId: options.mangaId,
  lang: CONSTANTS.DEFAULT_LOCALE,
  limit,
  offset: options.offset
});

const Chapters = (props) => {
  const { mangaId, paramName, tabParamValue } = props;
  const { chapters, isFetching } = useSelector(({ chapters }) => chapters);
  const { getChapters } = bindActionCreators(actionCreators, useDispatch());

  const queryParams = { mangaId };
  const { currentPage, setCurrentPage, existedParams } = useTabPagination({
    actionCreator: getChapters,
    queryOptions, queryParams,
    paramName, tabParamValue,
    limit,
  });

  const emptyTab = useCheckingEmptyValues(chapters.data, 'No Chapters', isFetching);
  if (emptyTab) return emptyTab;

  return (
    <Col>
      <Col>
      </Col>
      <Volumes chapters={chapters} />
      <Col>
      </Col>
      <PaginationButtons
        itemCount={chapters.total} limit={limit}
        currentPage={currentPage} setCurrentPage={setCurrentPage}
        existedParams={existedParams}
      />
    </Col>
  );
};

export default Chapters;