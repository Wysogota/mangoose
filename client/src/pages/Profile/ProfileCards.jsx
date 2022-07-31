import React from 'react';
import { useSelector } from 'react-redux';
import MangaCard from '../../components/MangaCard';
import { useLoading } from '../../hooks';
import styles from './Profile.module.scss';

const ProfileCards = (props) => {
  const { list, listName } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);

  const emptyList = useLoading({ data: list, title: `No ${listName} manga` });
  if (emptyList) return emptyList;

  return (
    list.map((manga) => (
      <MangaCard
        id={manga.id} key={manga.id}
        className={styles[`card-${mainColor}`]}
        manga={manga}
      />
    ))
  );
};

export default ProfileCards;
