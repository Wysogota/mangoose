import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import NavItems from '../NavItems';
import styles from './Header.module.scss';
const { Catalog, Search, FAQ, News, Contacts, Random, Theme } = NavItems;

const HeaderNavbar = ({ showToggleTheme }) => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);

  const navbarClasses = cx(
    styles.navbar,
    'justify-content-center'
  );

  return (
    <Navbar variant={invertedColor} className={navbarClasses}>
      <Nav>{Catalog(Nav.Link)}</Nav>
      <Nav>{Search(Nav.Link)}</Nav>
      <Nav>{FAQ(Nav.Link)}</Nav>
      <Nav><NavDropdown menuVariant={invertedColor}>
        {News(NavDropdown.Item)}
        {Contacts(NavDropdown.Item)}
        <NavDropdown.Divider />
        {Random(NavDropdown.Item)}
        {!showToggleTheme && Theme(NavDropdown.Item, true)}
      </NavDropdown></Nav>
    </Navbar>
  );
};

export default HeaderNavbar;
