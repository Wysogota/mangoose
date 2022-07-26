import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../redux/actions/actionCreators';

const useAuthorization = () => {
  const { token } = useSelector(({ auth }) => auth);
  const { getMe, setAuthorized, setNotAuthorized, refreshToken } = bindActionCreators(actionCreators, useDispatch());

  useEffect(() => {
    const authHandle = (event) => {
      if (event.key === 'auth') {
        if (event.newValue === 'true') setAuthorized();
        else if (event.newValue === 'false') setNotAuthorized();
      }
    };

    refreshToken();
    window.addEventListener('storage', authHandle);
  }, []);

  useEffect(() => {
    if (token) {
      getMe();
      // setTimeout(() => {
      //   refreshToken();
      // }, 36000);
    }
  }, [token]);
};

export default useAuthorization;
