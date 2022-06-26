import React from 'react';
import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';
import ColBlock from '../../Blocks/ColBlock';
import { Link } from 'react-router-dom';

const MangaCard = (props) => {
  const { title, desc, image, to } = props;
  const { theme: { mainColor, hoveredTheme } } = useSelector(({ themes }) => themes);
  return (
    <ColBlock className='col-12 col-md-6 m-auto'>
      <Card bg={mainColor} border={mainColor}>
        <Card.Img src={image} />
        <Card.Body>
          <Card.Title><Link to={to} className={hoveredTheme}>{title}</Link></Card.Title>
          <Card.Text>{desc}</Card.Text>
        </Card.Body>
      </Card>
    </ColBlock>
  );
};

export default MangaCard;
