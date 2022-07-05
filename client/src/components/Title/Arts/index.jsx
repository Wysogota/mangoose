import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { useSearchParams } from 'react-router-dom';
import { Col, Image, Spinner } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import cx from 'classnames';
import MainHeader from '../../Headers/MainHeader';
import PaginationButtons from '../../PaginationButtons';
import styles from './Arts.module.scss';
import CONSTANTS from '../../../constants';
const { PARAM_NAME: { page } } = CONSTANTS;

const limit = 5;
const options = (options) => ({
  mangaId: options.mangaId,
  limit,
  offset: options.offset
});

const Arts = (props) => {
  const { mangaId, paramName, tabParamValue } = props;
  const { covers, isFetching } = useSelector(({ cover }) => cover);
  const { theme: { bgAccentTheme } } = useSelector(({ themes }) => themes);
  const { getMangaCovers } = bindActionCreators(actionCreators, useDispatch());

  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(0);
  const [existedParams, setExistedParams] = useState([]);
  const [isSameTab, setIsSameTab] = useState();
  useEffect(() => {
    getMangaCovers(options({
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
