import React from 'react';
import { useSelector } from 'react-redux';
import MangaCard from '../../components/MangaCard';
import { useLoading } from '../../hooks';
import styles from './Profile.module.scss';
import CONSTANTS from '../../constants';
const { MANGA_COVER_SIZES: { MEDIUM } } = CONSTANTS;

const ProfileCards = (props) => {
  const { list, listName } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);

  const emptyList = useLoading({ data: list, title: `No ${listName} manga` });
  if (emptyList) return emptyList;

  return (
    list.map((manga) => (
      <MangaCard
        key={manga.id}
        manga={manga}
        imageSize={MEDIUM}
        className={styles[`card-${mainColor}`]}
      />
    ))
  );
};

export default ProfileCards;
