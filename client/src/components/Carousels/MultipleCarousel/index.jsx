import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Accordion } from 'react-bootstrap';
import ItemsCarousel from 'react-items-carousel';
import cx from 'classnames';
import HeaderLink from '../../Headers/HeaderLink';
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

  const leftChevron = (
    <a className='carousel-control-prev'>
      <span className={cx('carousel-control-prev-icon', styles.chevron)} />
    </a>
  );
  const rightChevron = (
    <a className='carousel-control-next'>
      <span className={cx('carousel-control-next-icon', styles.chevron)} />
    </a>
  );

  return (
    <ColBlock>
      <Accordion className={`accordion-${invertedColor} inverted`} defaultActiveKey={Number(isOpen)}>
        <Accordion.Item eventKey={1}>
          <Accordion.Header onClick={() => toggleCarousel(order)}>
            <HeaderLink to={`${CATALOG_PATH}?${SORT}=${filter}`}>{title}</HeaderLink>
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

MultipleCarousel.propTypes = {
  order: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  filter: PropTypes.string.isRequired,
};

export default MultipleCarousel;
