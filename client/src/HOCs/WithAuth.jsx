import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../redux/actions/actionCreators';
import { useNavigate } from 'react-router-dom';
import CONSTANTS from '../constants';
const {
  PAGES: {
    HOME: { path: homePath },
  },
} = CONSTANTS;

const WithAuth = (Component) => {
  const Hoc = () => {
    const { isAuthorized } = useSelector(({ auth }) => auth);
    const { showSignIn, refreshToken } = bindActionCreators(actionCreators, useDispatch());
    const navigate = useNavigate();

    if (isAuthorized) {
      return <Component />;
    } else {
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

  return <Hoc />;
};

export default WithAuth;
