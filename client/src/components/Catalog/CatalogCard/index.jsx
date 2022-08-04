import React from 'react';
import { useSelector } from 'react-redux';
import { Accordion, Card, Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import ColBlock from '../../Blocks/ColBlock';
import styles from './CatalogCard.module.scss';
import CONSTANTS from '../../../constants';
const { PAGES: { TITLE: { path } } } = CONSTANTS;

const CatalogCard = (props) => {
  const { title, desc, image, to, className } = props;
  const { theme: { mainColor, invertedColor, mainTheme, hoveredTheme } } = useSelector(({ themes }) => themes);

  const colBlockClasses = cx(
    className,
    'm-auto',
  );
  const cardClasses = cx(
    styles.card,
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
    <ColBlock className={colBlockClasses}>
      <Card
        bg={mainColor} border={mainColor}
        className={cardClasses} style={{ backgroundImage: `url(${image})` }}
      >
        <div className={'carousel-' + invertedColor}>
          <Carousel.Caption className='pt-0'>
            <Accordion className={'accordion-' + invertedColor}>
              <Accordion.Item eventKey='1'>
                <Accordion.Header className='fs-3 d-flex justify-content-between' >
                  <Link to={`${path}/${to}`} className={linkClasses}>{title}</Link>
                </Accordion.Header>
                <Accordion.Body className={bodyClasses}>
                  {desc}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Carousel.Caption>
        </div>
      </Card>
    </ColBlock>
  );
};

export default CatalogCard;
