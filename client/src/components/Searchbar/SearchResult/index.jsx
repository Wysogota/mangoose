import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { capitalize } from 'lodash';
import { selectRelationship } from '../../../common/functions';
import { useCheckingEmptyValues } from '../../../hooks';
import RelatedCard from '../../Title/RelatedCard';
import CONSTANTS from '../../../constants';
const { DEFAULT_LOCALE } = CONSTANTS;

const SearchResult = () => {
  const { mangaSearch, inputValue, isFetching } = useSelector(({ mangaSearch }) => mangaSearch);
  const { hideSearchbar } = bindActionCreators(actionCreators, useDispatch());

  const emptyResult = useCheckingEmptyValues(mangaSearch, 'No results found', isFetching);
  if (emptyResult && inputValue) return emptyResult;

  return (
    <div>
      {mangaSearch.map(({
        id, relationships,
        attributes: { title, description, status, tags }
      }) => (
        <RelatedCard
          key={id} id={id} onClick={hideSearchbar}
          image={selectRelationship(relationships, 'cover_art').attributes.url}
          title={title[DEFAULT_LOCALE]}
          description={description[DEFAULT_LOCALE]}
          status={capitalize(status)}
          tags={tags}
        />
      ))
      }
    </div>
  );
};

export default SearchResult;
