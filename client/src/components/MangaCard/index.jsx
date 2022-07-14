import React from 'react';
import { useSelector } from 'react-redux';
import { Card, Col } from 'react-bootstrap';
import cx from 'classnames';
import TagButtons from '../Title/TagButtons';
import styles from './MangaCard.module.scss';
import { Link } from 'react-router-dom';

const MangaCard = (props) => {
  const { id, image, related, title, description, status, tags, onClick } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);

  const cardClasses = cx(
    styles.card,
    styles[`card-${mainColor}`],
    'flex-row rounded mb-3'
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
    <Card className={cardClasses} onClick={onClick}>
      <Col xs='4' md='3' xl='2'>
        <Card.Img src={image} className={imageClasses} />
      </Col>
      <Col xs='8' md='9' xl='10'>
        <Card.Body>
          <div className='d-flex justify-content-between'>
            <Card.Title className={titleClasses}><Link to={`/title/${id}`}>{title}</Link></Card.Title>
            <div className={statusClasses}>{status}</div>
          </div>
          {related && <Card.Subtitle className='pb-2'>{related}</Card.Subtitle>}
          <Card.Text className={styles.description}>{description}</Card.Text>
          <TagButtons tags={tags} tagClassName={styles[`tag-${mainColor}`]} shouldOverflow />
        </Card.Body>
      </Col>

    </Card>
  );
};

export default MangaCard;
