import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col } from 'react-bootstrap';
import cx from 'classnames';
import TagButtons from '../../Title/TagButtons';
import styles from './ExtendedMangaCard.module.scss';
import { Link } from 'react-router-dom';
import CONSTANTS from '../../../constants';
import { getLocaleValue, selectRelationship } from '../../../common/functions';
import { capitalize } from 'lodash';
const {
  PAGES: { TITLE: { path: TITLE_PATH } },
  MANGA_COVER_SIZES: { RAW },
} = CONSTANTS;

const ExtendedMangaCard = (props) => {
  const { manga, imageSize = RAW, onClick, className } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);

  const {
    id, relationships, related,
    attributes: { title, description, status, tags }
  } = manga;
  const image = selectRelationship(relationships, 'cover_art').attributes.urls[imageSize];

  const cardClasses = cx(
    styles.card,
    styles[`card-${mainColor}`],
    className,
    'flex-row rounded mb-3',
  );
  const imageClasses = cx(
    styles.image,
    'rounded'
  );
  const titleClasses = cx(
    styles.title,
    'fs-4'
  );
  const statusClasses = cx(
    styles.status,
    styles[`status-${mainColor}`],
  );

  return (
    <Card className={cardClasses}>
      <Col xs='4' md='3' xl='2'>
        <Card.Img src={image} className={imageClasses} />
      </Col>
      <Col xs='8' md='9' xl='10'>
        <Card.Body>
          <div className='d-flex justify-content-between'>
            <Card.Title className={titleClasses}>
              <Link to={`${TITLE_PATH}/${id}`} onClick={onClick}>{getLocaleValue(title)}</Link>
            </Card.Title>
            <div className={statusClasses}>{capitalize(status)}</div>
          </div>
          {related && <Card.Subtitle className='pb-2'>{related}</Card.Subtitle>}
          <Card.Text className={styles.description}>{getLocaleValue(description)}</Card.Text>
          <TagButtons tags={tags} tagClassName={styles[`tag-${mainColor}`]} shouldOverflow />
        </Card.Body>
      </Col>
    </Card>
  );
};

export default ExtendedMangaCard;
