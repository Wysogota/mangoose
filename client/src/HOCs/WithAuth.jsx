import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../redux/actions/actionCreators';
import { useNavigate } from 'react-router-dom';
import CONSTANTS from '../constants';
import { useLoading } from '../hooks';
const {
  PAGES: {
    HOME: { path: homePath },
  },
} = CONSTANTS;

const WithAuth = (Component) => {
  const Hoc = () => {
    const { token, isTokenUpdated } = useSelector(({ auth }) => auth);
    const { showSignIn } = bindActionCreators(actionCreators, useDispatch());
    const navigate = useNavigate();

    const loading = useLoading({ isFetching: !isTokenUpdated, spinner: false });
    if (loading) return loading;

    if (token) return <Component />;
    else {
      useEffect(() => {
        navigate(
          window.history.state.idx > 0 ? -1 : homePath,
          { replace: true }
        );
        showSignIn();
      }, []);

      return null;
    }
  };

  return Hoc;
};

export default WithAuth;
