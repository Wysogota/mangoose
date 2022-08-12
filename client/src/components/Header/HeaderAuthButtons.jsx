import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DropdownToggle from '../DropdownToggle';
import Avatar from '../Avatar';
import { useAuthRedirect, useLoading } from '../../hooks';
import CONSTANTS from '../../constants';
const { PAGES: {
  SIGN_UP: { path: SIGN_UP_PATH },
  PROFILE: { path: PROFILE_PATH },
  SETTINGS: { path: SETTINGS_PATH },
} } = CONSTANTS;

const redirectPaths = [
  PROFILE_PATH, SETTINGS_PATH,
];

const HeaderAuthButtons = () => {
  const { theme: { invertedColor, outlineColor } } = useSelector(({ themes }) => themes);
  const { me: { name }, isFetching: meIsFetching } = useSelector(({ me }) => me);
  const { token, isFetching: authIsFetching, errors } = useSelector(({ auth }) => auth);
  const { showSignIn, signOut } = bindActionCreators(actionCreators, useDispatch());
  const [isRequested, setIsRequested] = useState(false);
  const authRedirect = useAuthRedirect();

  const signOutHandle = () => {
    signOut();
    setIsRequested(true);
  };

  useEffect(() => {
    if (isRequested && !authIsFetching && !errors) {
      setIsRequested(false);
      authRedirect(redirectPaths);
    }
  }, [authIsFetching]);

  const loading = useLoading({ meIsFetching, spinner: false });
  if (loading) return loading;

  if (token) return (
    <Dropdown className='d-inline'>
      <Dropdown.Toggle as={DropdownToggle}>
        <Avatar compact />
      </Dropdown.Toggle>

      <Dropdown.Menu variant={invertedColor}>
        <Dropdown.ItemText>{name}</Dropdown.ItemText>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to={PROFILE_PATH}>Profile</Dropdown.Item>
        <Dropdown.Item as={Link} to={SETTINGS_PATH}>Settings</Dropdown.Item>
        <Dropdown.Item onClick={signOutHandle}>Sign Out</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
  else return (
    <ButtonGroup className='pt-2 pb-2'>
      <Button onClick={showSignIn} variant={outlineColor}>Sign In</Button>
      <Button as={Link} to={SIGN_UP_PATH} variant={invertedColor}>Sign Up</Button>
    </ButtonGroup>
  );
};

export default HeaderAuthButtons;
