import React from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Dropdown } from 'react-bootstrap';
import { useAfterAuthAction } from '../../hooks';
import CONSTANTS from '../../constants';
const { PAGES: {
  PROFILE: { path: PROFILE_PATH },
  SETTINGS: { path: SETTINGS_PATH },
} } = CONSTANTS;

const redirectPaths = [
  PROFILE_PATH, SETTINGS_PATH,
];

const SignOutItem = () => {
  const { signOut } = bindActionCreators(actionCreators, useDispatch());
  const { setIsRequested } = useAfterAuthAction(redirectPaths);

  const signOutHandle = () => {
    signOut();
    setIsRequested(true);
  };

  return (
    <Dropdown.Item onClick={signOutHandle}>Sign Out</Dropdown.Item>
  );
};

export default SignOutItem;
