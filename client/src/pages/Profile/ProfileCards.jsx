import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { isEmpty } from 'lodash';
import ExtendedMangaCard from '../../components/Cards/ExtendedMangaCard';
import PaginationButtons from '../../components/PaginationButtons';
import MinorHeader from '../../components/Headers/MinorHeader';
import { useLoading, usePagination } from '../../hooks';
import styles from './Profile.module.scss';
import CONSTANTS from '../../constants';
const { MANGA_COVER_SIZES: { MEDIUM } } = CONSTANTS;

const limit = 5;

const ProfileCards = (props) => {
  const { ids, listName } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);
  const { mangaCatalog, total, isFetching } = useSelector(({ mangaLists }) => mangaLists).listCatalogs[listName];
  const { getMangaCatalogFromList } = bindActionCreators(actionCreators, useDispatch());

  if (isEmpty(ids)) return (
    <MinorHeader className='text-center mt-5 mb-5 fs-3'>{`No ${listName} manga`}</MinorHeader>
  );

  const queryParams = { ids, limit };
  usePagination({ actionCreator: getMangaCatalogFromList, queryParams, limit }, [listName], listName);

  const loading = useLoading({ data: mangaCatalog, isFetching });
  if (loading) return loading;

  return (
    <section>
      <article>
        {mangaCatalog.map((manga) => (
          <ExtendedMangaCard
            key={manga.id}
            manga={manga}
            imageSize={MEDIUM}
            className={styles[`card-${mainColor}`]}
          />
        ))}
      </article>
      <PaginationButtons itemCount={total} paginationName={listName} limit={limit} />
    </section>
  );
};

export default ProfileCards;
