import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
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
import Advertisement from '../../components/Advertisement';

const Home = () => {
  const isCarouselOpen = useSelector(({ carousels }) => carousels);

  const [genres, setGenres] = useState([]);
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
          {!extendedCatalog && <Col xs='12' >
            <Row>
              <ColBlock className='col-12'>
                <HeaderLink to='/news' title='Catalog' />
                <Genres setGenres={setGenres} />
              </ColBlock>
              <MangaCatalog genres={genres} className='col-12 col-md-4' />
              <Row><CatalogButton /></Row>
            </Row>
          </Col>}
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
        {extendedCatalog && <Col xs='12'>
          <Row>
            <ColBlock className='col-12'>
              <HeaderLink to='/news' title='Catalog' />
              <Genres setGenres={setGenres} />
            </ColBlock>
            <MangaCatalog genres={genres} className='col-10 col-sm-7 col-md-6 col-lg-4 col-xl-3' />
            <Row><CatalogButton /></Row>
          </Row>
        </Col>}
      </Row>
    </Container>
  );
};

export default Home;
