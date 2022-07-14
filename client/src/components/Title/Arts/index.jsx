import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Col, Image, Spinner } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import cx from 'classnames';
import MainHeader from '../../Headers/MainHeader';
import PaginationButtons from '../../PaginationButtons';
import { useTabPagination } from '../../../hooks';
import styles from './Arts.module.scss';

const limit = 5;

const Arts = (props) => {
  const { mangaId, paramName, tabParamValue } = props;
  const { covers, isFetching } = useSelector(({ cover }) => cover);
  const { theme: { bgAccentTheme } } = useSelector(({ themes }) => themes);
  const { getMangaCovers } = bindActionCreators(actionCreators, useDispatch());

  const queryParams = { mangaId };
  const { currentPage, setCurrentPage, existedParams } = useTabPagination({
    actionCreator: getMangaCovers, queryParams, limit, paramName, tabParamValue,
  });

  const containerClasses = cx(
    styles.arts_conatiner,
    bgAccentTheme,
    'rounded p-3',
  );

  const imageClasses = cx(
    styles.image,
    'pe-2 rounded',
  );

  const contentClasses = cx(
    styles.image_container,
    'd-flex justify-content-center align-items-center',
  );

  return (
    <Col className={containerClasses}>
      <Col>
        <MainHeader>Arts</MainHeader>
        <div className={contentClasses}>{
          (isEmpty(covers) || isFetching)
            ? <Spinner animation='border' role='status'></Spinner>
            : covers.covers.map(({ id, volume, url }) =>
              <Image key={id} src={url} alt={volume} className={imageClasses} />
            )
        }</div>
      </Col>
      <Col>
        <PaginationButtons
          itemCount={covers.total} limit={limit}
          currentPage={currentPage} setCurrentPage={setCurrentPage}
          existedParams={existedParams}
        />
      </Col>
    </Col>
  );
};

export default Arts;
