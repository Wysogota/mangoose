import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import SingleCarousel from '../../components/Carousels/SingleCarousel';
import MultipleCarousel from '../../components/Carousels/MultipleCarousel';
import NewsList from '../../components/Lists/NewsList';
import NewCharaptersList from '../../components/Lists/NewCharaptersList';
import HeaderLink from '../../components/HeaderLink';
import ColBlock from '../../components/Blocks/ColBlock';
import Advertisement from '../../components/Advertisement';
import HomeMangaCatalog from './HomeMangaCatalog';

const Home = () => {
  const isCarouselOpen = useSelector(({ carousels }) => carousels);

  const [extendedCatalog, setExtendedCatalog] = useState(Object.values(isCarouselOpen).every((carousel) => carousel === true));

  useEffect(() => {
    setExtendedCatalog(Object.values(isCarouselOpen).every((carousel) => carousel === true));
  }, [isCarouselOpen]);

  const NewCharapters = () => (
    <ColBlock title='New chapters'>
      <HeaderLink to='#' title='New chapters' />
      <NewCharaptersList />
    </ColBlock>
  );

  return (
    <Container>
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
          {!extendedCatalog && <HomeMangaCatalog />}
        </Col>
        <Col lg='3' className='d-none d-lg-block'>
          <Row><SingleCarousel /></Row>
          <Row><NewCharapters /></Row>
          <Row>
            <ColBlock >
              <HeaderLink to='#' title='advertisement' />
              <Advertisement />
            </ColBlock>
          </Row>
        </Col>
        {extendedCatalog && <HomeMangaCatalog extendedCatalog />}
      </Row>
    </Container>
  );
};

export default Home;
