import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Carousel } from 'react-bootstrap';
import ColBlock from '../../Blocks/ColBlock';
import MainHeader from '../../Headers/MainHeader';
import CarouselCard from '../../Cards/CarouselCard';
import { useLoading } from '../../../hooks';
import styles from './SingleCarousel.module.scss';
import CONSTANTS from '../../../constants';
const { MANGA_COVER_SIZES: { SMALL } } = CONSTANTS;

const SingleCarousel = () => {
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);
  const { recommendationCatalog, isFetching } = useSelector(({ recommendationList }) => recommendationList);
  const { getRecommendationList } = bindActionCreators(actionCreators, useDispatch());

  useEffect(() => { getRecommendationList(); }, []);

  const loading = useLoading({ data: recommendationCatalog, isFetching });

  const LoadingItem = () => (
    <Carousel.Item className={styles.loading}>
      {loading}
    </Carousel.Item>
  );
  const MangaItems = () => recommendationCatalog.map((manga) => (
    <Carousel.Item key={manga.id} className={styles.item}>
      <CarouselCard manga={manga} imageSize={SMALL} />
    </Carousel.Item>
  ));

  return (
    <ColBlock>
      <MainHeader>Recommendation</MainHeader>
      <Carousel interval='10000' variant={mainColor} >
        {loading ? LoadingItem() : MangaItems()}
      </Carousel>
    </ColBlock>
  );
};

export default SingleCarousel;
