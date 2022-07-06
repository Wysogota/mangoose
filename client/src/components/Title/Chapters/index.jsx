import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Col, Spinner } from 'react-bootstrap';
import PaginationButtons from '../../PaginationButtons';
import { isEmpty } from 'lodash';
import usePagination from '../../../hooks/usePagination';
import Volumes from '../Volumes';
import CONSTANTS from '../../../constants';

const limit = 20;
const queryOptions = (options) => ({
  mangaId: options.mangaId,
  lang: CONSTANTS.DEFAULT_LOCALE,
  limit,
  offset: options.offset
});

const Chapters = (props) => {
  const { mangaId, paramName, tabParamValue } = props;
  const { chapters, isFetching } = useSelector(({ chapter }) => chapter);
  const { getChapters } = bindActionCreators(actionCreators, useDispatch());

  const { currentPage, setCurrentPage, existedParams } = usePagination({
    actionCreator: getChapters,
    queryOptions,
    mangaId, paramName, tabParamValue,
    limit,
  });

  return (
    <Col>
      <Col>
      </Col>{
        (isEmpty(chapters) || isFetching)
          ? <Spinner animation='border' role='status'></Spinner>
          : <Volumes chapters={chapters} />
      }
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
