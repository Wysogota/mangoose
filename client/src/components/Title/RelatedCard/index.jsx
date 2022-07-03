import React from 'react';
import { Card, Col, Dropdown } from 'react-bootstrap';
import cx from 'classnames';
import TagButtons from '../TagButtons';
import styles from './RelatedCard.module.scss';
import { Link } from 'react-router-dom';

const RelatedCard = (props) => {
  const { id, image, related, title, description, status, tags } = props;

  const cardClasses = cx(
    styles.card,
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

  return (
    <Card className={cardClasses}>
      <Col xs='4' md='3' xl='2'>
        <Card.Img src={image} className={imageClasses} />
      </Col>
      <Col xs='8' md='9' xl='10'>
        <Card.Body>
          <div className='d-flex justify-content-between'>
            <Card.Title className={titleClasses}><Link to={`/title/${id}`}>{title}</Link></Card.Title>
            <div className={styles.status}>{status}</div>
          </div>
          <Card.Subtitle className='pb-2'>{related}</Card.Subtitle>
          <Card.Text className={styles.description}>{description}</Card.Text>
          <TagButtons tags={tags} shouldOverflow />
        </Card.Body>
      </Col>

    </Card>
  );
};

export default RelatedCard;
