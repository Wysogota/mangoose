import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import ColBlock from '../../components/Blocks/ColBlock';
import Genres from '../../components/Catalog/Genres';
import MangaCatalog from '../../components/Catalog/MangaCatalog';

const Catalog = () => {
  const [genres, setGenres] = useState([]);

  return (
    <Container>
      <Row>
        <ColBlock className='col-12'>
          <h3 className='pb-3'>Catalog</h3>
          <Genres setGenres={setGenres} />
        </ColBlock>
        <MangaCatalog genres={genres} className='col-3'/>
      </Row>

    </Container>
  );
};

export default Catalog;
