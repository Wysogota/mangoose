import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { useSearchParams } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import ColBlock from '../../components/Blocks/ColBlock';
import CatalogButton from '../../components/Catalog/CatalogButton';
import Genres from '../../components/Catalog/Genres';
import MangaCatalog from '../../components/Catalog/MangaCatalog';
import HeaderLink from '../../components/HeaderLink';
import { useCheckingEmptyValues } from '../../hooks';
import CONSTANTS from '../../constants';
const { PARAM_NAME: { FILTER: { TAGS, SORT } } } = CONSTANTS;

const limit = 12;

const HomeMangaCatalog = ({ extendedCatalog }) => {
  const { mangaCatalog, isFetching } = useSelector(({ mangaCatalog }) => mangaCatalog);
  const { getMangaCatalog } = bindActionCreators(actionCreators, useDispatch());
  const [searchParams] = useSearchParams();

  const queryParams = {
    [TAGS]: searchParams.getAll(TAGS),
    [SORT]: searchParams.get(SORT),
    limit
  };
  useEffect(() => getMangaCatalog(queryParams), [searchParams]);

  const catalogClasses = extendedCatalog
    ? 'col-10 col-sm-7 col-md-6 col-lg-4 col-xl-3'
    : 'col-12 col-md-4';

  const emptyCatalog = useCheckingEmptyValues(mangaCatalog, 'Catalog Empty', isFetching);

  return (
    <Col>
      <Row>
        <ColBlock className='col-12'>
          <HeaderLink to='/news' title='Catalog' />
          <Genres redirect />
        </ColBlock>
        {emptyCatalog ? emptyCatalog :
          <>
            <MangaCatalog catalog={mangaCatalog} className={catalogClasses} />
            <Row className='pt-5'><CatalogButton title='More' params={searchParams} /></Row>
          </>
        }
      </Row>
    </Col>
  );
};

export default HomeMangaCatalog;
