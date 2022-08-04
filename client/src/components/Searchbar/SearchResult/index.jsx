import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { isEmpty } from 'lodash';
import { useLoading } from '../../../hooks';
import MangaCard from '../../MangaCard';
import CatalogButton from '../../Catalog/CatalogButton';
import CONSTANTS from '../../../constants';
const { MANGA_COVER_SIZES: { SMALL } } = CONSTANTS;

const SearchResult = () => {
  const { theme: { bgAccentTheme } } = useSelector(({ themes }) => themes);
  const { mangaSearch, inputValue, isFetching } = useSelector(({ mangaSearch }) => mangaSearch);
  const { hideSearchbar } = bindActionCreators(actionCreators, useDispatch());

  const loading = useLoading({ data: mangaSearch, title: 'No results found', isFetching });
  if (loading && inputValue) return loading;

  return (
    <div>
      {mangaSearch.map((manga) => (
        <MangaCard
          key={manga.id}
          manga={manga}
          imageSize={SMALL}
          onClick={hideSearchbar}
        />
      ))}
      {!isEmpty(mangaSearch) &&
        <CatalogButton title='Load More' onClick={hideSearchbar} bgTheme={bgAccentTheme} stopAnimation />
      }
    </div>
  );
};

export default SearchResult;
