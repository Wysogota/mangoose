import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Container, Row } from 'react-bootstrap';
import ColBlock from '../../components/Blocks/ColBlock';
import Genres from '../../components/Catalog/Genres';
import MangaCatalog from '../../components/Catalog/MangaCatalog';
import PaginationButtons from '../../components/PaginationButtons';
import { useCheckingEmptyValues, usePagination } from '../../hooks';
import { getPageTitle } from '../../common/functions';
import CONSTANTS from '../../constants';
const { PAGES: { CATALOG: { name } } } = CONSTANTS;

const limit = 32;

const queryOptions = (options) => ({
  limit,
  offset: options.offset
});

const Catalog = () => {
  const { mangaCatalog, total, isFetching } = useSelector(({ mangaCatalog }) => mangaCatalog);
  const { getMangaCatalog } = bindActionCreators(actionCreators, useDispatch());
  const [genres, setGenres] = useState([]);

  useEffect(() => { document.title = getPageTitle(name); }, []);

  const { currentPage, setCurrentPage } = usePagination({
    actionCreator: getMangaCatalog,
    queryOptions,
    limit,
  });

  const emptyCatalog = useCheckingEmptyValues(mangaCatalog, 'Catalog Empty', isFetching);
  if (emptyCatalog) return emptyCatalog;

  return (
    <Container>
      <Row>
        <ColBlock className='col-12'>
          <h3 className='pb-3'>Catalog</h3>
          <Genres setGenres={setGenres} />
        </ColBlock>
        <MangaCatalog catalog={mangaCatalog} genres={genres} className='col-10 col-sm-7 col-md-6 col-lg-4 col-xl-3' />
      </Row>
      <Row>
        <PaginationButtons
          itemCount={total} limit={limit}
          currentPage={currentPage} setCurrentPage={setCurrentPage}
        />
      </Row>
    </Container>
  );
};

export default Catalog;
