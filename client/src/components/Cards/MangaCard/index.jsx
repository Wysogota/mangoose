import React from 'react';
import { useSelector } from 'react-redux';
import { Accordion, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { getLocaleValue, selectRelationship } from '../../../common/functions';
import styles from './MangaCard.module.scss';
import CONSTANTS from '../../../constants';
const {
  PAGES: { TITLE: { path } },
  MANGA_COVER_SIZES: { RAW },
} = CONSTANTS;

const MangaCard = (props) => {
  const { manga = {}, imageSize = RAW, className } = props;
  const { theme: { mainColor, invertedColor, mainTheme, hoveredTheme } } = useSelector(({ themes }) => themes);

  const { id, attributes: { title, description }, relationships } = manga;
  const image = selectRelationship(relationships, 'cover_art').attributes.urls[imageSize];

  const cardClasses = cx(
    styles.card,
    className,
    'rounded',
  );
  const linkClasses = cx(
    styles.header,
    mainTheme,
    hoveredTheme,
    'fs-5',
  );
  const bodyClasses = cx(
    mainTheme,
    'text-left',
  );

  return (
    <Card
      bg={mainColor} border={mainColor}
      className={cardClasses} style={{ backgroundImage: `url(${image})` }}
    >
      <div className={'carousel-' + invertedColor}>
        <Carousel.Caption className='pt-0'>
          <Accordion className={'accordion-' + invertedColor}>
            <Accordion.Item eventKey='1'>
              <Accordion.Header className='fs-3 d-flex justify-content-between' >
                <Link to={`${path}/${id}`} className={linkClasses}>{getLocaleValue(title)}</Link>
              </Accordion.Header>
              <Accordion.Body className={bodyClasses}>
                {getLocaleValue(description)}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </Carousel.Caption>
      </div>
    </Card>
  );
};

export default MangaCard;
