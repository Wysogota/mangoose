import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { useLoading } from '../../hooks';
import ExtendedMangaCard from '../../components/Cards/ExtendedMangaCard';

const ProfileManage = () => {
  const { recommendationCatalog, isFetching } = useSelector(({ recommendationList }) => recommendationList);
  const { token } = useSelector(({ auth }) => auth);
  const { getFullRecommendationList } = bindActionCreators(actionCreators, useDispatch());

  useEffect(() => { getFullRecommendationList({ token }); }, []);

  const loading = useLoading({ data: recommendationCatalog, isFetching });
  if (loading) return loading;

  return (
    <section>
      {recommendationCatalog.map((manga) =>
        <ExtendedMangaCard key={manga.id} manga={manga} />
      )}
    </section>
  );
};

export default ProfileManage;
