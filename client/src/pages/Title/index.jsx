import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Button, Col, Container, Row, Spinner, Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import MainHeader from '../../components/Headers/MainHeader';
import TitleTabs from './TitleTabs';
import Cover from '../../components/Title/Cover';
import CONSTANTS from '../../constants';

const Title = () => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const { manga, isFetching } = useSelector(({ manga }) => manga);
  const { getManga } = bindActionCreators(actionCreators, useDispatch());

  const { mangaId } = useParams();
  useEffect(() => getManga(mangaId), []);

  if (_.isEmpty(manga) || isFetching) {
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

  } else {

    const {
      attributes: {
        title: { [CONSTANTS.DEFAULT_LOCALE]: title }, //TODO если пусто тогда искать первое что не пусто
        description: { [CONSTANTS.DEFAULT_LOCALE]: desc },
        tags,
      },
      attributes,
      relationships,
    } = manga;

    const altTitles = [
      ...attributes.altTitles
        .filter((item) => item[CONSTANTS.DEFAULT_LOCALE])
        .map((item) => item[CONSTANTS.DEFAULT_LOCALE])
    ];

    const coverUrl = relationships.filter((item) => item.type === 'cover_art')[0].attributes.url;

    return (
      <Container>
        <Row className='justify-content-between'>
          <Col xs='12' lg='3'>
            <Cover image={coverUrl} alt={title} />
            <Button variant={invertedColor} className='w-100 pt-2 pb-2 text-uppercase' style={{ fontWeight: 600 }}>Start reading</Button>
          </Col>
          <Col xs='12' lg='8'>
            <Row>
              <MainHeader className='fs-1'>{title}</MainHeader>
              <MainHeader className='fs-6'>{altTitles.join(' | ')}</MainHeader>
            </Row>
            <Row>
              <TitleTabs desc={desc} tags={tags}/>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
};

export default Title;
