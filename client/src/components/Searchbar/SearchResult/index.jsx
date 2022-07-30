import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { capitalize, isEmpty } from 'lodash';
import { selectRelationship } from '../../../common/functions';
import { useLoading } from '../../../hooks';
import MangaCard from '../../MangaCard';
import CONSTANTS from '../../../constants';
import CatalogButton from '../../Catalog/CatalogButton';
const { DEFAULT_LOCALE } = CONSTANTS;

const SearchResult = () => {
  const { theme: { bgAccentTheme } } = useSelector(({ themes }) => themes);
  const { mangaSearch, inputValue, isFetching } = useSelector(({ mangaSearch }) => mangaSearch);
  const { hideSearchbar } = bindActionCreators(actionCreators, useDispatch());

  const loading = useLoading({ data: mangaSearch, title: 'No results found', isFetching });
  if (loading && inputValue) return loading;

  return (
    <div>
      {mangaSearch.map(({
        id, relationships,
        attributes: { title, description, status, tags }
      }) => (
        <MangaCard
          key={id} id={id} onClick={hideSearchbar}
          image={selectRelationship(relationships, 'cover_art').attributes.url}
          title={title[DEFAULT_LOCALE]}
          description={description[DEFAULT_LOCALE]}
          status={capitalize(status)}
          tags={tags}
        />
      ))
      }
      {!isEmpty(mangaSearch) &&
        <CatalogButton title='Load More' onClick={hideSearchbar} bgTheme={bgAccentTheme} stopAnimation />
      }
    </div>
  );
};

export default SearchResult;
