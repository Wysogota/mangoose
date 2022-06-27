import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ColBlock from '../../components/Blocks/ColBlock';
import Genres from '../../components/Catalog/Genres';
import MangaCatalog from '../../components/Catalog/MangaCatalog';

const Catalog = () => {
  const [genres, setGenres] = useState([]);

  return (
    <Container className='pt-5 pb-5'>
      <Row>
        <ColBlock className='col-12'>
          <h3 className='pb-3'>Catalog</h3>
          <Genres setGenres={setGenres} />
        </ColBlock>
        <MangaCatalog genres={genres} className='col-10 col-sm-7 col-md-6 col-lg-4 col-xl-3'/>
      </Row>

    </Container>
  );
};

export default Catalog;
