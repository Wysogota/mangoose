import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Accordion, Carousel as bsCarousel } from 'react-bootstrap';
import ItemsCarousel from 'react-items-carousel';
import cx from 'classnames';
import HeaderLink from '../../HeaderLink';
import ColBlock from '../../Blocks/ColBlock';
import CarouselHeader from '../CarouselHeader';
import styles from './MultipleCarousel.module.scss';
import CONSTANTS from '../../../constants';
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
  const { stateName, title, to } = props;
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);

  const isOpen = useSelector(({ carousels }) => carousels)[`isOpen${stateName}Carousel`];
  const toggleCarousel = bindActionCreators(actionCreators, useDispatch())[`toggle${stateName}Carousel`];

  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [displayCount, setDisplayCount] = useState();

  useEffect(() => {
    const getDisplayCount = () => {
      (window.innerWidth >= breakpoints.md)
        ? (window.innerWidth >= breakpoints.xl) ? setDisplayCount(5) : setDisplayCount(4)
        : setDisplayCount(3);
    };

    getDisplayCount();
    window.addEventListener('resize', getDisplayCount);
    return () => window.removeEventListener('resize', getDisplayCount);
  }, []);

  const containerClasses = cx(
    styles.container,
    'carousel-' + invertedColor
  );
  const imageClasses = cx(
    styles.image,
    'rounded',
  );

  const leftChevron = <span className={cx('carousel-control-prev-icon', styles.chevron)}></span>;
  const rightChevron = <span className={cx('carousel-control-next-icon', styles.chevron)}></span>;

  return (
    <ColBlock>
      <Accordion defaultActiveKey={Number(isOpen)}>
        <Accordion.Item eventKey={1}>
          <Accordion.Header onClick={toggleCarousel}>
            <HeaderLink to={to} title={title} />
          </Accordion.Header>
          <Accordion.Body className='p-0'>
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
                  <img className={imageClasses} src={src} alt={alt} />
                  <bsCarousel.Caption>
                    <CarouselHeader to={to} className={styles.header}>{title}</CarouselHeader>
                  </bsCarousel.Caption>
                </div>
              )}
            </ItemsCarousel>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </ColBlock>
  );
};

export default MultipleCarousel;
