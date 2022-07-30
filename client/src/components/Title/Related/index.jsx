import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { capitalize, isEmpty } from 'lodash';
import MangaCard from '../../MangaCard';
import { useLoading } from '../../../hooks';
import { selectRelationship } from '../../../common/functions';
import CONSTANTS from '../../../constants';
const { RELATED_FILTER, DEFAULT_LOCALE } = CONSTANTS;

const Related = (props) => {
  const filteredRelationshops = props.relationships.filter(
    (item) => item.related && !RELATED_FILTER.includes(item.related)
  );
  const { mangaCatalog, isFetching } = useSelector(({ mangaCatalog }) => mangaCatalog);
  const { getMangaCatalog } = bindActionCreators(actionCreators, useDispatch());
  const [relatedManga, setRelatedManga] = useState([]);

  useEffect(() => {
    const mangaIds = filteredRelationshops.map(({ id }) => id);
    if (mangaIds.length) getMangaCatalog({ ids: mangaIds, limit: 100 });
  }, []);

  useEffect(() => {
    if (!isEmpty(mangaCatalog)) {
      const relatedList = filteredRelationshops.map(({ id, related }) => ({
        id,
        related: capitalize(related.replaceAll('_', ' ')),
      }));

      setRelatedManga(
        mangaCatalog.map(t1 => ({
          ...t1, ...relatedList.find(t2 => t2.id === t1.id)
        }))
      );
    }
  }, [mangaCatalog]);

  const loading = useLoading({ data: relatedManga, title: 'No Related', isFetching });
  if (loading) return loading;

  return (
    <div>{
      relatedManga.map(({
        id, related, relationships,
        attributes: { title, description, status, tags }
      }) => (
        <MangaCard
          key={id} id={id}
          image={selectRelationship(relationships, 'cover_art').attributes.url}
          related={related}
          title={title[DEFAULT_LOCALE]}
          description={description[DEFAULT_LOCALE]}
          status={capitalize(status)}
          tags={tags}
        />
      ))
    }</div>
  );
};

export default Related;
