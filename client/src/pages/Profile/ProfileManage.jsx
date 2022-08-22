import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import ExtendedMangaCard from '../../components/Cards/ExtendedMangaCard';
import { useLoading } from '../../hooks';
import CONSTANTS from '../../constants';
const { MANGA_COVER_SIZES: { SMALL } } = CONSTANTS;

const ProfileManage = () => {
  const { recommendationCatalog } = useSelector(({ recommendationList }) => recommendationList);
  const { token } = useSelector(({ auth }) => auth);
  const { getFullRecommendationList } = bindActionCreators(actionCreators, useDispatch());

  useEffect(() => { getFullRecommendationList({ token }); }, []);

  const loading = useLoading({ data: recommendationCatalog });
  if (loading) return loading;

  return (
    <section>
      {recommendationCatalog.map((manga) =>
        <ExtendedMangaCard key={manga.id} manga={manga} imageSize={SMALL} />
      )}
    </section>
  );
};

export default ProfileManage;
