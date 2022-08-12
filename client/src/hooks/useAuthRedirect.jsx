import { useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { isEmpty } from 'lodash';
import CONSTANTS from '../constants';
const { PAGES: { HOME: { path: HOME_PATH } } } = CONSTANTS;

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const authRedirect = useCallback((redirectPaths = []) => {
    const endIndex = pathname.indexOf('/', pathname.indexOf('/') + 1);
    const sliceIndex = endIndex > 1 ? endIndex : pathname.length;
    const currentPath = pathname.slice(0, sliceIndex) || pathname;

    if (redirectPaths.includes(currentPath) || isEmpty(redirectPaths)) {
      navigate(HOME_PATH);
    }
  });

  return authRedirect;
};

export default useAuthRedirect;
