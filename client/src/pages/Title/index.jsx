import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import ColBlock from '../../components/Blocks/ColBlock';
import MainHeader from '../../components/Headers/MainHeader';
import TitleTabs from './TitleTabs';
import Cover from '../../components/Title/Cover';
import CONSTANTS from '../../constants';
import TitleInfoList from './TitleInfoList';
import { selectRelationshipAttr } from '../../common/functions';

const Title = () => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const { manga, isFetching } = useSelector(({ manga }) => manga);
  const { getManga } = bindActionCreators(actionCreators, useDispatch());

  const { mangaId } = useParams();
  useEffect(() => getManga({ mangaId }), [mangaId]);

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

    const { cover_art, author: { name: authorName }, artist: { name: atristName } } = selectRelationshipAttr(
      relationships,
      ['cover_art', 'author', 'artist']
    );

    const { status, lastChapter, publicationDemographic, year } = attributes;
    const titleInfoAttr = {
      status, lastChapter, publicationDemographic, year, authorName, atristName
    };

    return (
      <Container>
        <Row className='justify-content-between'>
          <ColBlock className='col-12 col-lg-3'>
            <Cover image={cover_art.url} alt={title} />
            <Button
              variant={invertedColor}
              className='w-100 pt-2 pb-2 mb-3 text-uppercase'
              style={{ fontWeight: 600 }}
            >Start reading</Button>
            <TitleInfoList attributes={titleInfoAttr} />
          </ColBlock>
          <ColBlock className='col-12 col-lg-9'>
            <Col>
              <MainHeader className='fs-1'>{title}</MainHeader>
              <MainHeader className='fs-6'>{altTitles.join(' | ')}</MainHeader>
            </Col>
            <Col>
              <TitleTabs mangaId={mangaId} desc={desc} tags={tags} relationships={relationships} />
            </Col>
          </ColBlock>
        </Row>
      </Container>
    );
  }
};

export default Title;
