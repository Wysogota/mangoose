import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import UserMenu from '../UserMenu';
import CONSTANTS from '../../constants';
const { PAGES: { SIGN_UP: { path: SIGN_UP_PATH } } } = CONSTANTS;

const HeaderAuthButtons = () => {
  const { theme: { invertedColor, outlineColor } } = useSelector(({ themes }) => themes);
  const { isAuthorized } = useSelector(({ auth }) => auth);
  const { showSignIn } = bindActionCreators(actionCreators, useDispatch());

  if (isAuthorized) return (
    <UserMenu />
  );
  else return (
    <ButtonGroup className='pt-2 pb-2'>
      <Button onClick={showSignIn} variant={outlineColor}>Sign In</Button>
      <Button as={Link} to={SIGN_UP_PATH} variant={invertedColor}>Sign Up</Button>
    </ButtonGroup>
  );
};

export default HeaderAuthButtons;
