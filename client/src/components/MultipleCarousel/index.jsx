import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Carousel as bsCarousel, Col } from 'react-bootstrap';
import ItemsCarousel from 'react-items-carousel';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import CarouselHeader from '../CarouselHeader';
import { BsChevronDoubleRight as TransitionIcon } from 'react-icons/bs';
import styles from './MultipleCarousel.module.scss';
import CONSTANTS from '../../constants';
const { breakpoints } = CONSTANTS;

const items = [
  {
    src: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
    alt: CONSTANTS.DEFAULT_POSTER,
    to: '#',
    title: 'Attack on titan 1Attack on titan 1Attack on titan 1Attack on titan 1Attack on titan 1',
  },
  {
    src: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
    alt: CONSTANTS.DEFAULT_POSTER,
    to: '#',
    title: 'Attack on titan 2',
  },
  {
    src: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
    alt: CONSTANTS.DEFAULT_POSTER,
    to: '#',
    title: 'Attack on titan 3',
  },
  {
    src: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
    alt: CONSTANTS.DEFAULT_POSTER,
    to: '#',
    title: 'Attack on titan 4',
  },
  {
    src: CONSTANTS.STATIC_IMAGE_PATH + CONSTANTS.DEFAULT_POSTER,
    alt: CONSTANTS.DEFAULT_POSTER,
    to: '#',
    title: 'Attack on titan 5',
  },
];

const MultipleCarousel = (props) => {
  const { title, to } = props;
  const { theme: { invertedColor, bgTheme, hoveredTheme } } = useSelector(({ themes }) => themes);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState();

  useEffect(() => {
    const getDisplayCount = () => {
      if (window.innerWidth >= breakpoints.md) {
        window.innerWidth >= breakpoints.xl ? setDisplayCount(5) : setDisplayCount(4);
      } else {
        setDisplayCount(3);
      }
    };

    getDisplayCount();
    window.addEventListener('resize', getDisplayCount);
    return () => window.removeEventListener('resize', getDisplayCount);
  }, []);

  const colClasses = cx(
    bgTheme,
    'p-3 mb-4 rounded'
  );

  const containerClasses = cx(
    styles.container,
    'carousel-' + invertedColor
  );

  const leftChevron = <span className={cx('carousel-control-prev-icon', styles.chevron)}></span>;
  const rightChevron = <span className={cx('carousel-control-next-icon', styles.chevron)}></span>;

  return (
    <Col className={colClasses}>
      <Link to={to}><h3 className={hoveredTheme + ' pb-3'}>{title}<TransitionIcon /></h3></Link>
      <ItemsCarousel
        requestToChangeActive={setActiveItemIndex}
        activeItemIndex={activeItemIndex}
        numberOfCards={displayCount}
        gutter={10}
        leftChevron={leftChevron}
        rightChevron={rightChevron}
        infiniteLoop={true}
      >
        {items.map(({ src, alt, to, title }) =>
          <div key={title} className={containerClasses}>
            <img className={styles.image} src={src} alt={alt} />
            <bsCarousel.Caption>
              <CarouselHeader to={to} className={styles.header}>{title}</CarouselHeader>
            </bsCarousel.Caption>
          </div>
        )}
      </ItemsCarousel>
    </Col>
  );
};

export default MultipleCarousel;
