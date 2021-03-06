import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { capitalize, isEmpty } from 'lodash';
import MangaCard from '../../MangaCard';
import { useLoading } from '../../../hooks';
import CONSTANTS from '../../../constants';
const { RELATED_FILTER } = CONSTANTS;

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
      relatedManga.map((manga) => (
        <MangaCard key={manga.id} id={manga.id} manga={manga} />
      ))
    }</div>
  );
};

export default Related;
