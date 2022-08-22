import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { useParams } from 'react-router-dom';
import { Col, Image } from 'react-bootstrap';
import cx from 'classnames';
import MainHeader from '../../Headers/MainHeader';
import PaginationButtons from '../../PaginationButtons';
import { useLoading, usePagination } from '../../../hooks';
import styles from './Arts.module.scss';
import CONSTANTS from '../../../constants';
const { MANGA_COVER_SIZES: { SMALL } } = CONSTANTS;

const limit = 5;

const getImageWidth = (length) => {
  const divisor = length < limit ? 3 : limit;
  return `${100 / divisor}%`;
};

const Arts = () => {
  const { covers, isFetching, total } = useSelector(({ cover }) => cover);
  const { theme: { bgAccentTheme } } = useSelector(({ themes }) => themes);
  const { getMangaCovers } = bindActionCreators(actionCreators, useDispatch());
  const { mangaId } = useParams();

  const queryParams = { mangaId };
  usePagination({ actionCreator: getMangaCovers, queryParams, limit });

  const containerClasses = cx(
    styles.arts_conatiner,
    bgAccentTheme,
    'rounded p-3',
  );

  const contentClasses = cx(
    styles.image_container,
    'd-flex justify-content-center align-items-center',
  );

  const loading = useLoading({ data: covers, isFetching });
  if (loading) return loading;

  return (
    <Col className={containerClasses}>
      <Col>
        <MainHeader>Arts</MainHeader>
        <div className={contentClasses}>
          {covers.map(({ id, volume, urls }) => (
            <Image key={id}
              src={urls[SMALL]}
              alt={volume}
              className='pe-2 rounded'
              style={{ width: getImageWidth(covers.length) }}
            />
          ))}
        </div>
      </Col>
      <Col>
        <PaginationButtons itemCount={total} limit={limit} />
      </Col>
    </Col>
  );
};

export default Arts;
