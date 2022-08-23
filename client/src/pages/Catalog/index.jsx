import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { useSearchParams } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import ColBlock from '../../components/Blocks/ColBlock';
import SearchInput from '../../components/Searchbar/SearchInput';
import Genres from '../../components/Catalog/Genres';
import MainHeader from '../../components/Headers/MainHeader';
import MangaCatalog from '../../components/Catalog/MangaCatalog';
import PaginationButtons from '../../components/PaginationButtons';
import { useLoading, usePagination } from '../../hooks';
import CONSTANTS from '../../constants';
const {
  PARAM_NAME: { PAGE, FILTER: { TITLE, TAGS, SORT, AUTHOR, ARTIST } },
} = CONSTANTS;

const limit = 32;

const Catalog = () => {
  const { inputValue, mangaSearch, total, isFetching } = useSelector(({ mangaSearch }) => mangaSearch);
  const { getMangaSearch, clearMangaSearch } = bindActionCreators(actionCreators, useDispatch());
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (inputValue) {
      searchParams.set(PAGE, 1);
      searchParams.set(TITLE, inputValue);
      setSearchParams(searchParams, { replace: true });
    }
    return () => clearMangaSearch();
  }, []);

  useEffect(() => {
    const isFocused = document.activeElement === document.querySelector('[data-name="searchInput"]');
    if (isFocused) {
      searchParams.set(PAGE, 1);
      inputValue
        ? searchParams.set(TITLE, inputValue)
        : searchParams.delete(TITLE);
      setSearchParams(searchParams, { replace: true });
    }
  }, [inputValue]);

  useEffect(() => {
    searchParams.set(PAGE, 1);
    setSearchParams(searchParams, { replace: true });
  }, [searchParams.get(SORT)]);

  const queryParams = {
    [TITLE]: searchParams.get(TITLE),
    [TAGS]: searchParams.getAll(TAGS),
    [SORT]: searchParams.get(SORT),
    [AUTHOR]: searchParams.get(AUTHOR),
    [ARTIST]: searchParams.get(ARTIST),
  };
  usePagination({ actionCreator: getMangaSearch, queryParams, limit });

  const loading = useLoading({ data: mangaSearch, title: 'Catalog Empty', isFetching });

  return (
    <Container>
      <Row>
        <ColBlock>
          <MainHeader>Catalog</MainHeader>
          <SearchInput limit={limit} className='mb-3' />
          <Genres />
        </ColBlock>
      </Row>
      {loading ? loading :
        <>
          <Row>
            <MangaCatalog catalog={mangaSearch}className='col-12 col-sm-6 col-lg-4 col-xl-3'
            />
          </Row>
          <Row>
            <PaginationButtons itemCount={total} limit={limit} />
          </Row>
        </>
      }
    </Container>
  );
};

export default Catalog;
