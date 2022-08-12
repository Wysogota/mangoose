import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Button, ButtonGroup, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DropdownToggle from '../DropdownToggle';
import Avatar from '../Avatar';
import SignOutItem from './SignOutItem';
import CONSTANTS from '../../constants';
const { PAGES: {
  SIGN_UP: { path: SIGN_UP_PATH },
  PROFILE: { path: PROFILE_PATH },
  SETTINGS: { path: SETTINGS_PATH },
} } = CONSTANTS;

const HeaderAuthButtons = () => {
  const { theme: { invertedColor, outlineColor } } = useSelector(({ themes }) => themes);
  const { me: { name } } = useSelector(({ me }) => me);
  const { isAuthorized } = useSelector(({ auth }) => auth);
  const { showSignIn } = bindActionCreators(actionCreators, useDispatch());

  if (isAuthorized) return (
    <Dropdown className='d-inline'>
      <Dropdown.Toggle as={DropdownToggle}>
        <Avatar compact />
      </Dropdown.Toggle>

      <Dropdown.Menu variant={invertedColor}>
        <Dropdown.ItemText>{name}</Dropdown.ItemText>
        <Dropdown.Divider />
        <Dropdown.Item as={Link} to={PROFILE_PATH}>Profile</Dropdown.Item>
        <Dropdown.Item as={Link} to={SETTINGS_PATH}>Settings</Dropdown.Item>
        <SignOutItem />
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
