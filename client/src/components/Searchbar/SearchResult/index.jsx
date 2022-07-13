import React from 'react';
import { useSelector } from 'react-redux';
import { capitalize } from 'lodash';
import { selectRelationship } from '../../../common/functions';
import { useCheckingEmptyValues } from '../../../hooks';
import RelatedCard from '../../Title/RelatedCard';
import CONSTANTS from '../../../constants';
const { DEFAULT_LOCALE } = CONSTANTS;

const SearchResult = (props) => {
  const { isInputEmpty } = props;
  const { mangaSearch, isFetching } = useSelector(({ mangaSearch }) => mangaSearch);

  const emptyResult = useCheckingEmptyValues(mangaSearch, 'No results found', isFetching);
  if (emptyResult && !isInputEmpty) return emptyResult;

  return (
    <div>
      {mangaSearch.map(({
        id, relationships,
        attributes: { title, description, status, tags }
      }) => (
        <RelatedCard
          key={id} id={id}
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
