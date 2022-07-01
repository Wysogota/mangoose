import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Col, Container, Image, Pagination, Row, Spinner } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import cx from 'classnames';
import styles from './Arts.module.scss';
import Cover from '../Cover';

const limit = 5;

const options = (options) => ({
  mangaId: options.mangaId,
  limit,
  offset: options.offset
});

const Arts = (props) => {
  const { mangaId } = props;
  const { covers, isFetching } = useSelector(({ cover }) => cover);
  const { theme: { bgAccentTheme } } = useSelector(({ themes }) => themes);
  const { getMangaCovers } = bindActionCreators(actionCreators, useDispatch());

  useEffect(() => {
    getMangaCovers(options({ mangaId: mangaId, offset: 0 }));
  }, []);
  if (isEmpty(covers) || isFetching) {
    return (
      <Container>
        <Row>
          <Col>
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </Col>
        </Row>
      </Container>
    );
  }
  else {

    const getPaginationButtons = () => {
      const count = Math.ceil(covers.total / limit);
      return new Array(count).fill(null).map((_, i) =>
        <Pagination.Item key={i + 1}>{i + 1}</Pagination.Item>
      );
    };

    const containerClasses = cx(
      bgAccentTheme,
      'rounded p-2',
    );

    return (
      <div className={containerClasses}>
        <Row>
          <Col className={styles.arts_conatiner}>
            {
              covers.covers.map(({ id, volume, url }) =>
                <Image key={id} src={url} alt={volume} className={'p-2 rounded ' + styles.image} />
              )
            }
          </Col>
        </Row>
        <Row>
          <Col>
            <Pagination className='justify-content-center p-2 pt-3'>
              <Pagination.First />
              <Pagination.Prev />
              {getPaginationButtons()}
              <Pagination.Next />
              <Pagination.Last />
            </Pagination>
          </Col>
        </Row>
      </div>
    );

  }

};

export default Arts;
