import React, { useEffect } from 'react';
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
const {
  PARAM_NAME: { PAGE, FILTER: { TITLE, TAGS } },
  PAGES: { CATALOG: { name } }
} = CONSTANTS;

const limit = 32;

const Catalog = () => {
  const { inputValue, mangaSearch, total, isFetching } = useSelector(({ mangaSearch }) => mangaSearch);
  const { getMangaSearch, clearMangaSearch, setSearchValue } = bindActionCreators(actionCreators, useDispatch());
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    document.title = getPageTitle(name);
    if (!inputValue) setSearchValue(searchParams.get(TITLE));
    return () => clearMangaSearch();
  }, []);

  useEffect(() => {
    searchParams.set(PAGE, 1);
    searchParams.set(TITLE, inputValue);
    setSearchParams(searchParams, { replace: true });
  }, [inputValue]);

  const queryParams = { title: inputValue, includedTags: searchParams.getAll(TAGS) };
  const { currentPage, setCurrentPage, existedParams } = usePagination({
    actionCreator: getMangaSearch, queryParams, limit,
  });

  useEffect(() => {
    getMangaSearch(Object.assign(
      queryParams,
      { limit, offset: 0 },
    ));
  }, [searchParams]);

  const emptyCatalog = useCheckingEmptyValues(mangaSearch, 'Catalog Empty', isFetching);

  return (
    <Container>
      <Row>
        <ColBlock>
          <h3 className='pb-3'>Catalog</h3>
          <SearchInput limit={limit} className='mb-3' />
          <Genres />
        </ColBlock>
      </Row>
      {emptyCatalog ?
        emptyCatalog :
        <>
          <Row>
            <MangaCatalog
              catalog={mangaSearch}
              className='col-10 col-sm-7 col-md-6 col-lg-4 col-xl-3'
            />
          </Row>
          <Row>
            <PaginationButtons
              itemCount={total} limit={limit}
              currentPage={currentPage} setCurrentPage={setCurrentPage}
              existedParams={existedParams} isPageFirst
            />
          </Row>
        </>}
    </Container>
  );
};

export default Catalog;
