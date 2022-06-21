import React from 'react';
import cx from 'classnames';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import NavItems from '../NavItems';
import styles from './Header.module.scss';
const { Catalog, Search, FAQ, News, Contacts, Random, Theme } = NavItems;

const HeaderNavbar = () => {
  const navbarClasses = cx(
    styles.navbar,
    'justify-content-center'
  );

  return (
    <Navbar className={navbarClasses}>
      <Nav>{Catalog(Nav.Link)}</Nav>
      <Nav>{Search(Nav.Link)}</Nav>
      <Nav>{FAQ(Nav.Link)}</Nav>
      <Nav><NavDropdown>
        {News(NavDropdown.Item)}
        {Contacts(NavDropdown.Item)}
        <NavDropdown.Divider />
        {Random(NavDropdown.Item)}
        {Theme(NavDropdown.Item, 'd-lg-none')}
      </NavDropdown></Nav>
    </Navbar>
  );
};

export default HeaderNavbar;
