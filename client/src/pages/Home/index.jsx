import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import SingleCarousel from '../../components/Carousels/SingleCarousel';
import MultipleCarousel from '../../components/Carousels/MultipleCarousel';
import NewsList from '../../components/Lists/NewsList';
import HeaderLink from '../../components/HeaderLink';
import ColBlock from '../../components/Blocks/ColBlock';
import HomeMangaCatalog from './HomeMangaCatalog';
import CONSTANTS from '../../constants';
import HomeNewChapters from './HomeNewChapters';
const {
  PAGES: { NEWS: { path: NEWS_PATH } },
  SORT_LIST: {
    FOLLOWED_COUNT: { type: FOLLOWED_COUNT },
    YEAR: { type: LAST_CREATED },
    LAST_UPLOAD_CHAPTER: { type: LASTEST_CHAPTER }
  },
  SORT_DIRECTION: { DESC },
} = CONSTANTS;

const MILTIPLE_CAROUSELS = [
  {
    filter: `${FOLLOWED_COUNT}.${DESC}`,
    order: 0,
    title: 'Popular',
  },
  {
    filter: `${LAST_CREATED}.${DESC}`,
    order: 1,
    title: 'New arrivals',
  },
  {
    filter: `${LASTEST_CHAPTER}.${DESC}`,
    order: 2,
    title: 'Last updated',
  },
];

const checkEveryCorousel = (isCarouselOpen) => Object.values(isCarouselOpen).every(({ isOpen }) => isOpen);

const Home = () => {
  const isCarouselOpen = useSelector(({ carousels }) => carousels);
  const [extendedCatalog, setExtendedCatalog] = useState(checkEveryCorousel(isCarouselOpen));

  useEffect(() => {
    setExtendedCatalog(checkEveryCorousel(isCarouselOpen));
  }, [isCarouselOpen]);

  return (
    <Container>
      <Row>
        <Col xs='12' lg='8' xl='9'>
          {MILTIPLE_CAROUSELS.map(({ filter, order, title }) => (
            <MultipleCarousel key={order} filter={filter} order={order} title={title} />
          ))}
          <Row className='d-flex d-lg-none'>
            <HomeNewChapters extendedCatalog={extendedCatalog} />
          </Row>
          <Row className='flex-column flex-lg-row'>
            <ColBlock>
              <HeaderLink to='#' title='Recently read' />
              <NewsList />
            </ColBlock>
            <ColBlock className='d-lg-none d-xl-block'>
              <HeaderLink to={NEWS_PATH} title='Last news' />
              <NewsList />
            </ColBlock>
          </Row>
          <HomeMangaCatalog extendedCatalog={!extendedCatalog} />
        </Col>
        <Col lg='4' xl='3' className='d-none d-lg-flex flex-column'>
          <Row><SingleCarousel /></Row>
          <Row className={extendedCatalog && 'flex-grow-1'}>
            <HomeNewChapters extendedCatalog={extendedCatalog} />
          </Row>
          <Row>
            <ColBlock className='d-xl-none'>
              <HeaderLink to={NEWS_PATH} title='Last news' />
              <NewsList />
            </ColBlock>
          </Row>
        </Col>
        <HomeMangaCatalog extendedCatalog={extendedCatalog} shrinked />
      </Row>
    </Container>
  );
};

export default Home;
