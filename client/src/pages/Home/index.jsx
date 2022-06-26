import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import SingleCarousel from '../../components/Carousels/SingleCarousel';
import MultipleCarousel from '../../components/Carousels/MultipleCarousel';
import NewsList from '../../components/Lists/NewsList';
import NewCharaptersList from '../../components/Lists/NewCharaptersList';
import Genres from '../../components/Catalog/Genres';
import HeaderLink from '../../components/HeaderLink';
import ColBlock from '../../components/Blocks/ColBlock';
import CatalogButton from '../../components/Catalog/CatalogButton';
import MangaCatalog from '../../components/Catalog/MangaCatalog';

const Home = () => {
  const [genres, setGenres] = useState([]);

  const NewCharapters = () => (
    <ColBlock title='New chapters'>
      <HeaderLink to='#' title='New chapters' />
      <NewCharaptersList />
    </ColBlock>
  );

  return (
    <Container className='pt-5 pb-5'>
      <Row>
        <Col xs='12' lg='9'>
          <Row><MultipleCarousel stateName='Popular' title='Popular' to='#' /></Row>
          <Row><MultipleCarousel stateName='New' title='New arrivals' to='#' /></Row>
          <Row><MultipleCarousel stateName='HotNew' title='Hot news' to='#' /></Row>
          <Row className='d-flex d-lg-none'><NewCharapters /></Row>
          <Row>
            <ColBlock className='col-12 col-md-6'>
              <HeaderLink to='/news' title='Last news' />
              <NewsList />
            </ColBlock>
            <ColBlock className='col-12 col-md-6' >
              <HeaderLink to='#' title='Recently read' />
              <NewsList />
            </ColBlock>
          </Row>
          <Row>
            <ColBlock className='col-12'>
              <HeaderLink to='/news' title='Catalog' />
              <Genres setGenres={setGenres} />
            </ColBlock>
            <MangaCatalog genres={genres} />
            <Col xs='12'><CatalogButton /></Col>
          </Row>
        </Col>
        <Col lg='3' className='d-none d-lg-block'>
          <Row><SingleCarousel /></Row>
          <Row><NewCharapters /></Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
