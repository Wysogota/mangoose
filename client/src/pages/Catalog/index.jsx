import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { useSearchParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import ColBlock from '../../components/Blocks/ColBlock';
import SearchInput from '../../components/Searchbar/SearchInput';
import Genres from '../../components/Catalog/Genres';
import MangaCatalog from '../../components/Catalog/MangaCatalog';
import PaginationButtons from '../../components/PaginationButtons';
import { useCheckingEmptyValues, usePagination } from '../../hooks';
import { getPageTitle } from '../../common/functions';
import CONSTANTS from '../../constants';
const { PARAM_NAME: { PAGE }, PAGES: { CATALOG: { name } } } = CONSTANTS;

const limit = 32;

const Catalog = () => {
  const { inputValue, mangaSearch, total, isFetching } = useSelector(({ mangaSearch }) => mangaSearch);
  const { getMangaSearch, clearMangaSearch } = bindActionCreators(actionCreators, useDispatch());
  const [genres, setGenres] = useState([]);
  const [shouldClearSearch, setShouldClearSearch] = useState(!!inputValue);

  useEffect(() => {
    document.title = getPageTitle(name);
    clearMangaSearch();
    return () => clearMangaSearch();
  }, []);

  const queryParams = { title: shouldClearSearch ? '' : inputValue };
  const { currentPage, setCurrentPage } = usePagination({
    actionCreator: getMangaSearch, queryParams, limit,
  });

  const [, setSearchParams] = useSearchParams();
  useEffect(() => {
    setSearchParams({ [PAGE]: 1 }, { replace: true });
    setShouldClearSearch(false);
  }, [inputValue]);

  const emptyCatalog = useCheckingEmptyValues(mangaSearch, 'Catalog Empty', isFetching);

  return (
    <Container>
      <Row>
        <ColBlock>
          <h3 className='pb-3'>Catalog</h3>
          <SearchInput limit={limit} className='mb-3' />
          <Genres setGenres={setGenres} />
        </ColBlock>
      </Row>
      {emptyCatalog ?
        emptyCatalog :
        <>
          <Row>
            <MangaCatalog
              catalog={mangaSearch} genres={genres}
              className='col-10 col-sm-7 col-md-6 col-lg-4 col-xl-3'
            />
          </Row>
          <Row>
            <PaginationButtons
              itemCount={total} limit={limit}
              currentPage={currentPage} setCurrentPage={setCurrentPage}
            />
          </Row>
        </>}
    </Container>
  );
};

export default Catalog;
