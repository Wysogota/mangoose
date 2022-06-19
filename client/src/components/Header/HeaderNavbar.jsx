import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import {
  BsGridFill as CatalogIcon, BsSearch as SearchIcon, BsFillQuestionCircleFill as FAQIcon,
  BsNewspaper as NewsIcon, BsFillEnvelopeFill as ContactsIcon, BsShuffle as RandomIcon
} from 'react-icons/bs';
import styles from './Header.module.scss';
import ToggleTheme from '../ToggleTheme';

const HeaderNavbar = ({ showToggleTheme }) => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);

  const navbarClasses = cx(
    styles.navbar,
    'justify-content-center'
  );

  return (
    <Navbar variant={invertedColor} className={navbarClasses}>
      <Nav><Nav.Link href="#"><CatalogIcon /><span>Catalog</span></Nav.Link></Nav>
      <Nav><Nav.Link href="#"><SearchIcon /><span>Search</span></Nav.Link></Nav>
      <Nav><Nav.Link href="#"><FAQIcon /><span>FAQ</span></Nav.Link></Nav>
      <Nav>
        <NavDropdown menuVariant={invertedColor}>
          <NavDropdown.Item href="#"><NewsIcon /><span>News</span></NavDropdown.Item>
          <NavDropdown.Item href="#"><ContactsIcon /><span>Contacts</span></NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#"><RandomIcon /><span>Random</span></NavDropdown.Item>
          {!showToggleTheme && <ToggleTheme Component={NavDropdown.Item} shouldInverted>
            <span>Toggle theme</span>
          </ToggleTheme>}
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};

export default HeaderNavbar;
