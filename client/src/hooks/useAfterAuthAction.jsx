import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAuthRedirect from './useAuthRedirect';

const useAfterAuthAction = (redirectPaths, action = () => { }) => {
  const { isFetching, errors } = useSelector(({ auth }) => auth);
  const [isRequested, setIsRequested] = useState(false);
  const authRedirect = useAuthRedirect();

  useEffect(() => {
    if (isRequested && !errors) {
      setIsRequested(false);
      action();
      authRedirect(redirectPaths);
    }
  }, [isFetching]);

  return { setIsRequested };
};

export default useAfterAuthAction;
