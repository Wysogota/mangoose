import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import SingleCarousel from '../../components/Carousels/SingleCarousel';
import MultipleCarousel from '../../components/Carousels/MultipleCarousel';
import NewsList from '../../components/Lists/NewsList';
import NewChaptersList from '../../components/Lists/NewChaptersList';
import HeaderLink from '../../components/HeaderLink';
import ColBlock from '../../components/Blocks/ColBlock';
import Advertisement from '../../components/Advertisement';
import HomeMangaCatalog from './HomeMangaCatalog';
import CONSTANTS from '../../constants';
const {
  SORT_LIST: {
    FOLLOWED_COUNT: { type: FOLLOWED_COUNT },
    YEAR: { type: LAST_CREATED },
    LAST_UPLOAD_CHAPTER: { type: LASTEST_CHAPTER }
  },
  SORT_DIRECTION: { DESC },
} = CONSTANTS;

const checkEveryCorousel = (isCarouselOpen) => Object.values(isCarouselOpen).every(({ isOpen }) => isOpen);

const Home = () => {
  const isCarouselOpen = useSelector(({ carousels }) => carousels);

  const [extendedCatalog, setExtendedCatalog] = useState(checkEveryCorousel(isCarouselOpen));

  useEffect(() => {
    setExtendedCatalog(checkEveryCorousel(isCarouselOpen));
  }, [isCarouselOpen]);

  const NewChapters = () => (
    <ColBlock title='New chapters'>
      <HeaderLink to='#' title='New chapters' />
      <NewChaptersList />
    </ColBlock>
  );

  return (
    <Container>
      <Row>
        <Col xs='12' lg='9'>
          <MultipleCarousel
            filter={`${FOLLOWED_COUNT}.${DESC}`}
            order={0}
            title='Popular'
          />
          <MultipleCarousel
            filter={`${LAST_CREATED}.${DESC}`}
            order={1}
            title='New arrivals'
          />
          <MultipleCarousel
            filter={`${LASTEST_CHAPTER}.${DESC}`}
            order={2}
            title='Last updated'
          />
          <Row className='d-flex d-lg-none'><NewChapters /></Row>
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
          <HomeMangaCatalog extendedCatalog={!extendedCatalog} />
        </Col>
        <Col lg='3' className='d-none d-lg-block'>
          <Row><SingleCarousel /></Row>
          <Row><NewChapters /></Row>
          <Row>
            <ColBlock >
              <HeaderLink to='#' title='advertisement' />
              <Advertisement />
            </ColBlock>
          </Row>
        </Col>
        <HomeMangaCatalog extendedCatalog={extendedCatalog} shrinked />
      </Row>
    </Container>
  );
};

export default Home;
