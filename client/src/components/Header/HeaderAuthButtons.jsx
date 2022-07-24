import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import { useLoading } from '../../hooks';
import CONSTANTS from '../../constants';
const { PAGES: { SIGN_UP: { path: signUpPath } } } = CONSTANTS;

const HeaderAuthButtons = () => {
  const { theme: { invertedColor, outlineColor } } = useSelector(({ themes }) => themes);
  const { isFetching } = useSelector(({ me }) => me);
  const { isAuthorized } = useSelector(({ auth }) => auth);
  const { showSignIn, signOut } = bindActionCreators(actionCreators, useDispatch());

  const loading = useLoading({ isFetching, spinner: false });
  if (loading) return loading;

  if (isAuthorized) return (
    <span>
      <Button onClick={signOut} variant={outlineColor}>Sign Out</Button>
      <Avatar />
    </span>
  );

  else return (
    <ButtonGroup className='pt-2 pb-2'>
      <Button onClick={showSignIn} variant={outlineColor}>Sign In</Button>
      <Button as={Link} to={signUpPath} variant={invertedColor}>Sign Up</Button>
    </ButtonGroup>
  );

};

export default HeaderAuthButtons;
