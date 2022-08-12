import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Dropdown } from 'react-bootstrap';
import { useAuthRedirect } from '../../hooks';
import CONSTANTS from '../../constants';
const { PAGES: {
  PROFILE: { path: PROFILE_PATH },
  SETTINGS: { path: SETTINGS_PATH },
} } = CONSTANTS;

const redirectPaths = [
  PROFILE_PATH, SETTINGS_PATH,
];

const SignOutItem = () => {
  const { isFetching, errors } = useSelector(({ auth }) => auth);
  const { signOut } = bindActionCreators(actionCreators, useDispatch());
  const [isRequested, setIsRequested] = useState(false);
  const authRedirect = useAuthRedirect();

  const signOutHandle = () => {
    signOut();
    setIsRequested(true);
  };

  useEffect(() => {
    if (isRequested && !errors) {
      setIsRequested(false);
      authRedirect(redirectPaths);
    }
  }, [isFetching]);

  return (
    <Dropdown.Item onClick={signOutHandle}>Sign Out</Dropdown.Item>
  );
};

export default SignOutItem;
