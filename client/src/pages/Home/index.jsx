import React, { useEffect, useRef, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import cx from 'classnames';
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
  const [extendedCatalog, setExtendedCatalog] = useState(false);
  const genresRef = useRef(null);

  useEffect(() => {
    const scrollHandle = () => setExtendedCatalog(window.scrollY + 100 >= genresRef?.current.offsetTop);
    window.addEventListener('scroll', scrollHandle);
    return () => window.removeEventListener('scroll', scrollHandle);
  }, []);

  const NewCharapters = () => (
    <ColBlock title='New chapters'>
      <HeaderLink to='#' title='New chapters' />
      <NewCharaptersList />
    </ColBlock>
  );

  const mangaCatalogClasses = cx(
    'col-12 col-md-6',
    extendedCatalog ? 'col-lg-4 col-xl-3' : 'col-xl-4',
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
        </Col>
        <Col lg='3' className='d-none d-lg-block'>
          <Row><SingleCarousel /></Row>
          <Row><NewCharapters /></Row>
        </Col>
        <Col xs='12' lg={extendedCatalog ? '12' : '9'}>
          <Row>
            <ColBlock className='col-12' ref={genresRef}>
              <HeaderLink to='/news' title='Catalog' />
              <Genres setGenres={setGenres} />
            </ColBlock>
            <MangaCatalog genres={genres} className={mangaCatalogClasses} />
            <Row><CatalogButton /></Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
