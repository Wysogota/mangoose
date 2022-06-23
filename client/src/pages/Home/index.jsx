import React from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import SingleCarousel from '../../components/Carousels/SingleCarousel';
import MultipleCarousel from '../../components/Carousels/MultipleCarousel';
import InfoBlock from '../../components/Blocks/InfoBlock';
import NewsList from '../../components/Lists/NewsList';
import NewCharaptersList from '../../components/Lists/NewCharaptersList';

const Home = () => {
  return (
    <Container className='pt-5 pb-5'>
      <Row>
        <Col xs='12' lg='9'>
          <Row><MultipleCarousel stateName='Popular' title='Popular' to='#' /></Row>
          <Row><MultipleCarousel stateName='New' title='New arrivals' to='#' /></Row>
          <Row><MultipleCarousel stateName='HotNew' title='Hot news' to='#' /></Row>
          <Row>
            <InfoBlock className='col-12 col-md-6' title='Last news'>
              <NewsList />
            </InfoBlock>
            <InfoBlock className='col-12 col-md-6' title='Recently read' >
              <NewsList />
            </InfoBlock>
          </Row>
        </Col>
        <Col lg='3' className='d-none d-lg-block'>
          <Row><SingleCarousel /></Row>
          <Row>
            <InfoBlock title='New chapters'>
              <NewCharaptersList />
            </InfoBlock>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
