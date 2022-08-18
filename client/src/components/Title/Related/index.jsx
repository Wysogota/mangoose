import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { capitalize, isEmpty } from 'lodash';
import ExtendedMangaCard from '../../Cards/ExtendedMangaCard';
import { useLoading } from '../../../hooks';
import { mergeArrObjectsById } from '../../../common/functions';
import CONSTANTS from '../../../constants';
const { RELATED_FILTER, MANGA_COVER_SIZES: { SMALL } } = CONSTANTS;

const Related = (props) => {
  const filteredRelationshops = props.relationships.filter(
    (item) => item.related && !RELATED_FILTER.includes(item.related)
  );
  const { mangaCatalog, isFetching } = useSelector(({ mangaCatalog }) => mangaCatalog);
  const { getMangaCatalog, clearMangaCatalog } = bindActionCreators(actionCreators, useDispatch());
  const [relatedManga, setRelatedManga] = useState([]);

  useEffect(() => {
    const mangaIds = filteredRelationshops.map(({ id }) => id);
    if (mangaIds.length) getMangaCatalog({ ids: mangaIds, limit: 100 });
    return clearMangaCatalog;
  }, []);

  useEffect(() => {
    if (!isEmpty(mangaCatalog)) {
      const relatedList = filteredRelationshops.map(({ id, related }) => ({
        id,
        related: capitalize(related.replaceAll('_', ' ')),
      }));

      setRelatedManga(mergeArrObjectsById(mangaCatalog, relatedList));
    }
  }, [mangaCatalog]);

  const loading = useLoading({ data: relatedManga, title: 'No Related', isFetching });
  if (loading) return loading;

  return (
    <div>{
      relatedManga.map((manga) => (
        <ExtendedMangaCard key={manga.id} manga={manga} imageSize={SMALL} />
      ))
    }</div>
  );
};

export default Related;
