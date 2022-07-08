import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Spinner } from 'react-bootstrap';
import { capitalize } from 'lodash';
import RelatedCard from '../RelatedCard';
import { useCheckingEmptyTab } from '../../../hooks';
import { selectRelationship } from '../../../common/functions';
import CONSTANTS from '../../../constants';

const Related = (props) => {
  const { relationships } = props;
  const filteredRelationshops = relationships.filter((item) => item.related && item.related !== 'doujinshi' && item.related !== 'based_on');
  const { mangaCatalog, isFetching } = useSelector(({ mangaCatalog }) => mangaCatalog);
  const { getMangaCatalog } = bindActionCreators(actionCreators, useDispatch());
  const [relatedManga, setRelatedManga] = useState([]);

  useEffect(() => {
    const mangaIds = filteredRelationshops.map(({ id }) => id);
    getMangaCatalog({ ids: mangaIds, limit: 100 });
  }, []);

  useEffect(() => {
    if (mangaCatalog.length === filteredRelationshops.length) {
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

  const emptyTab = useCheckingEmptyTab(relatedManga, 'No Related');
  if (emptyTab) return emptyTab;

  return (
    <div>{
      isFetching
        ? <Spinner animation='border' role='status'></Spinner>
        : <>{relatedManga.map(({
          id, related, relationships,
          attributes: {
            title, description, status, tags
          }
        }) => (
          <RelatedCard
            key={id} id={id}
            image={selectRelationship(relationships, 'cover_art').attributes.url}
            related={related}
            title={title[CONSTANTS.DEFAULT_LOCALE]}
            description={description[CONSTANTS.DEFAULT_LOCALE]}
            status={capitalize(status)}
            tags={tags}
          />
        ))}
        </>
    }</div>
  );
};

export default Related;
