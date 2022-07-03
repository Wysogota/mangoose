import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Container, Row } from 'react-bootstrap';
import ColBlock from '../../components/Blocks/ColBlock';
import Genres from '../../components/Catalog/Genres';
import MangaCatalog from '../../components/Catalog/MangaCatalog';

const options = {
  limit: 32,
  offset: 0
};

const Catalog = () => {
  const { mangaCatalog, isFetching } = useSelector(({ mangaCatalog }) => mangaCatalog);
  const { getMangaCatalog } = bindActionCreators(actionCreators, useDispatch());
  const [genres, setGenres] = useState([]);

  useEffect(() => getMangaCatalog(options), []);

  return (
    <Container>
      <Row>
        <ColBlock className='col-12'>
          <h3 className='pb-3'>Catalog</h3>
          <Genres setGenres={setGenres} />
        </ColBlock>
        <MangaCatalog catalog={mangaCatalog} genres={genres} className='col-10 col-sm-7 col-md-6 col-lg-4 col-xl-3' />
      </Row>

    </Container>
  );
};

export default Catalog;
