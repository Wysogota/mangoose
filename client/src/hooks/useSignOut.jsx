import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../redux/actions/actionCreators';
import useAfterAuthAction from './useAfterAuthAction';
import CONSTANTS from '../constants';
const { PAGES: {
  PROFILE: { path: PROFILE_PATH },
  SETTINGS: { path: SETTINGS_PATH },
} } = CONSTANTS;

const redirectPaths = [
  PROFILE_PATH, SETTINGS_PATH,
];

const useSignOut = () => {
  const {
    signOut, clearMe, clearMangaLists, clearRecommendationList
  } = bindActionCreators(actionCreators, useDispatch());

  const { setIsRequested } = useAfterAuthAction(redirectPaths);

  return () => {
    signOut();
    clearMe();
    clearMangaLists();
    clearRecommendationList();
    setIsRequested(true);
  };
};

export default useSignOut;