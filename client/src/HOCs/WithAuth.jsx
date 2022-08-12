import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../redux/actions/actionCreators';
import { useNavigate } from 'react-router-dom';
import CONSTANTS from '../constants';
const { PAGES: { HOME: { path: HOME_PATH } } } = CONSTANTS;

const WithAuth = (Component) => {
  const Hoc = () => {
    const { token, isAuthorized } = useSelector(({ auth }) => auth);
    const { showSignIn } = bindActionCreators(actionCreators, useDispatch());
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthorized) {
        navigate(
          window.history.state.idx > 0 ? -1 : HOME_PATH,
          { replace: true }
        );
        showSignIn();
      }
    }, []);

    return token ? <Component /> : null;
  };

  return Hoc;
};

export default WithAuth;
