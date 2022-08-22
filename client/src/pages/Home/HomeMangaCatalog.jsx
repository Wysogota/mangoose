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
import HeaderLink from '../../components/Headers/HeaderLink';
import { useLoading } from '../../hooks';
import CONSTANTS from '../../constants';
const {
  PARAM_NAME: { FILTER: { TAGS, SORT, AUTHOR, ARTIST } },
  PAGES: { CATALOG: { path } }
} = CONSTANTS;

const limit = 12;

const HomeMangaCatalog = (props) => {
  const { extendedCatalog, shrinked } = props;
  const { mangaCatalog, isFetching } = useSelector(({ mangaCatalog }) => mangaCatalog);
  const { getMangaCatalog, clearMangaCatalog } = bindActionCreators(actionCreators, useDispatch());
  const [searchParams] = useSearchParams();

  const queryParams = {
    [TAGS]: searchParams.getAll(TAGS),
    [SORT]: searchParams.get(SORT),
    [AUTHOR]: searchParams.get(AUTHOR),
    [ARTIST]: searchParams.get(ARTIST),
    limit
  };

  useEffect(() => clearMangaCatalog, []);
  useEffect(() => { getMangaCatalog(queryParams); }, [searchParams]);

  const catalogClasses = 'col-12 col-sm-6 ' + (shrinked ? 'col-lg-4 col-xl-3' : 'col-xl-4');

  const loading = useLoading({ data: mangaCatalog, title: 'Catalog Empty', isFetching });

  return (
    <Col className={extendedCatalog ? 'd-block' : 'd-none'}>
      <Row>
        <ColBlock className='col-12'>
          <HeaderLink to={path}>Catalog</HeaderLink>
          <Genres redirect />
        </ColBlock>
        {loading ? loading :
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
