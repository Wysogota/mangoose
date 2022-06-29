import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import ColBlock from '../../components/Blocks/ColBlock';
import CatalogButton from '../../components/Catalog/CatalogButton';
import Genres from '../../components/Catalog/Genres';
import MangaCatalog from '../../components/Catalog/MangaCatalog';
import HeaderLink from '../../components/HeaderLink';

const HomeMangaCatalog = ({ extendedCatalog }) => {
  const [genres, setGenres] = useState([]);

  const catalogClasses = extendedCatalog
    ? 'col-10 col-sm-7 col-md-6 col-lg-4 col-xl-3'
    : 'col-12 col-md-4';

  return (
    <Col>
      <Row>
        <ColBlock className='col-12'>
          <HeaderLink to='/news' title='Catalog' />
          <Genres setGenres={setGenres} />
        </ColBlock>
        <MangaCatalog genres={genres} className={catalogClasses} />
        <Row><CatalogButton /></Row>
      </Row>
    </Col>
  );
};

export default HomeMangaCatalog;
