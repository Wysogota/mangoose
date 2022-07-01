import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Col, Row } from 'react-bootstrap';
import ColBlock from '../../components/Blocks/ColBlock';
import CatalogButton from '../../components/Catalog/CatalogButton';
import Genres from '../../components/Catalog/Genres';
import MangaCatalog from '../../components/Catalog/MangaCatalog';
import HeaderLink from '../../components/HeaderLink';

const options = {
  limit: 12,
  offset: 0
};

const HomeMangaCatalog = ({ extendedCatalog }) => {
  const { mangaCatalog, isFetching } = useSelector(({ manga }) => manga);
  const { getMangaCatalog } = bindActionCreators(actionCreators, useDispatch());
  const [genres, setGenres] = useState([]);

  useEffect(() => getMangaCatalog(options), []);

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
        {mangaCatalog.length &&
          <MangaCatalog catalog={mangaCatalog} genres={genres} className={catalogClasses} />
        }
        <Row className='pt-5'><CatalogButton /></Row>
      </Row>
    </Col>
  );
};

export default HomeMangaCatalog;
