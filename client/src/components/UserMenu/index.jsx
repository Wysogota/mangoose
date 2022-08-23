import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Avatar from '../Avatar';
import DropdownToggle from './DropdownToggle';
import SignOutItem from './SignOut';
import CONSTANTS from '../../constants';
const { PAGES: {
  PROFILE: { path: PROFILE_PATH },
  SETTINGS: { path: SETTINGS_PATH },
} } = CONSTANTS;

const UserMenu = (props) => {
  const { itemOnClick, direction, sidebar } = props;
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const { me: { name } } = useSelector(({ me }) => me);

  return (
    <Dropdown className='d-inline' drop={direction}>
      <Dropdown.Toggle as={DropdownToggle}>
        <Avatar compact />
      </Dropdown.Toggle>

      <Dropdown.Menu variant={invertedColor}>
        {!sidebar && <>
          <Dropdown.ItemText>{name}</Dropdown.ItemText>
          <Dropdown.Divider />
        </>}

        <Dropdown.Item as={Link} to={PROFILE_PATH} onClick={itemOnClick}>Profile</Dropdown.Item>
        <Dropdown.Item as={Link} to={SETTINGS_PATH} onClick={itemOnClick}>Settings</Dropdown.Item>
        {!sidebar && <SignOutItem onClick={itemOnClick} />}
      </Dropdown.Menu>
    </Dropdown>
  );
};

UserMenu.propTypes = {
  itemOnClick: PropTypes.func,
  direction: PropTypes.string,
  sidebar: PropTypes.bool,
};

export default UserMenu;
