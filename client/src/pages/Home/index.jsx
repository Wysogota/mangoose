import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import SidePoster from '../../components/SingleCarousel';
import MangaCarousel from '../../components/MultipleCarousel';

const Home = () => {
  const { theme: { bgTheme, mainColor } } = useSelector(({ themes }) => themes);
  return (
    <Container className='pt-5 pb-5'>
      <Row>
        <Col xs='12' lg='8'>
          <MangaCarousel title='Popular' to='#' />
          <MangaCarousel title='New arrivals' to='#' />
          <Row>
          </Row>
        </Col>
        <Col xs='3' className='d-none d-lg-block'>
          <SidePoster />
          <Col>
            <div>New chapters</div>
          </Col>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
