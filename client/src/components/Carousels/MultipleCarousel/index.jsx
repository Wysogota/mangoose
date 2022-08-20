import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Accordion } from 'react-bootstrap';
import ItemsCarousel from 'react-items-carousel';
import cx from 'classnames';
import HeaderLink from '../../HeaderLink';
import ColBlock from '../../Blocks/ColBlock';
import styles from './MultipleCarousel.module.scss';
import CONSTANTS from '../../../constants';
import { useLoading } from '../../../hooks';
import MangaCard from '../../Cards/MangaCard';
const {
  breakpoints,
  PAGES: { CATALOG: { path: CATALOG_PATH } },
  PARAM_NAME: { FILTER: { SORT } },
  MANGA_COVER_SIZES: { SMALL },
} = CONSTANTS;

const limit = 10;

const MultipleCarousel = (props) => {
  const { order, title, filter } = props;
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const { isOpen, mangaCatalog, isFetching } = useSelector(({ carousels }) => carousels)[order];
  const { toggleCarousel, getCarouselCatalog } = bindActionCreators(actionCreators, useDispatch());
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState();

  useEffect(() => {
    const getDisplayCount = () => {
      (window.innerWidth >= breakpoints.md)
        ? (window.innerWidth >= breakpoints.xl) ? setDisplayCount(5) : setDisplayCount(4)
        : setDisplayCount(3);
    };

    getCarouselCatalog({ [SORT]: filter, limit }, order);
    getDisplayCount();
    window.addEventListener('resize', getDisplayCount);
    return () => window.removeEventListener('resize', getDisplayCount);
  }, []);


  const loading = useLoading({ data: mangaCatalog, isFetching });

  const leftChevron = <span className={cx('carousel-control-prev-icon', styles.chevron)}></span>;
  const rightChevron = <span className={cx('carousel-control-next-icon', styles.chevron)}></span>;

  return (
    <ColBlock>
      <Accordion className={`accordion-${invertedColor}`} defaultActiveKey={Number(isOpen)}>
        <Accordion.Item eventKey={1}>
          <Accordion.Header onClick={() => toggleCarousel(order)}>
            <HeaderLink to={`${CATALOG_PATH}?${SORT}=${filter}`} title={title} />
          </Accordion.Header>
          {loading ? loading :
            <Accordion.Body className='p-0'>
              <ItemsCarousel
                requestToChangeActive={setActiveItemIndex}
                activeItemIndex={activeItemIndex}
                numberOfCards={displayCount}
                gutter={10}
                leftChevron={leftChevron}
                rightChevron={rightChevron}
                infiniteLoop={true}
              >{
                  mangaCatalog.map((manga) => (
                    <MangaCard
                      key={manga.id}
                      manga={manga}
                      className={styles.card}
                      imageSize={SMALL}
                    />
                  ))
                }</ItemsCarousel>
            </Accordion.Body>}
        </Accordion.Item>
      </Accordion>
    </ColBlock>
  );
};

export default MultipleCarousel;
