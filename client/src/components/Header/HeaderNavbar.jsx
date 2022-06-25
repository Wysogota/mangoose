import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import NavItems from '../NavItems';
import styles from './Header.module.scss';
const { Catalog, Search, FAQ, News, Contacts, Random, Theme } = NavItems;

const HeaderNavbar = () => {
  const { theme: { invertedColor, mainColor, invertedHoveredTheme, mainTheme } } = useSelector(({ themes }) => themes);

  const navbarClasses = cx(
    styles.navbar,
    'justify-content-center'
  );

  return (
    <Navbar className={navbarClasses} variant={invertedColor} >
      <Nav>{Catalog(Nav.Link)}</Nav>
      <Nav>{Search(Nav.Link)}</Nav>
      <Nav>{News(Nav.Link)}</Nav>
      <Nav><NavDropdown menuVariant={invertedColor}>
        {FAQ(NavDropdown.Item, { invertedHovered: true })}
        {Contacts(NavDropdown.Item, { invertedHovered: true })}
        <NavDropdown.Divider />
        {Random(NavDropdown.Item, { invertedHovered: true })}
        {Theme(NavDropdown.Item, { className: 'd-lg-none', shouldInverted: true })}
      </NavDropdown></Nav>
    </Navbar>
  );
};

export default HeaderNavbar;
