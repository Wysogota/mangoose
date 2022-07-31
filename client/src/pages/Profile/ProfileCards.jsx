import React from 'react';
import { capitalize } from 'lodash';
import MangaCard from '../../components/MangaCard';
import { selectRelationship } from '../../common/functions';
import { useLoading } from '../../hooks';
import styles from './Profile.module.scss';
import CONSTANTS from '../../constants';
import { useSelector } from 'react-redux';
const { DEFAULT_LOCALE } = CONSTANTS;

const ProfileCards = (props) => {
  const { list, listName } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);

  const emptyList = useLoading({ data: list, title: `No ${listName} manga` });
  if (emptyList) return emptyList;

  return (
    list.map(({
      id, relationships,
      attributes: { title, description, status, tags }
    }) => (
      <MangaCard
        id={id} key={id}
        className={styles[`card-${mainColor}`]}
        image={selectRelationship(relationships, 'cover_art').attributes.url}
        title={title[DEFAULT_LOCALE]}
        description={description[DEFAULT_LOCALE]}
        status={capitalize(status)}
        tags={tags}
      />
    ))
  );
};

export default ProfileCards;
