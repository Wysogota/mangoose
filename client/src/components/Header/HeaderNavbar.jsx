import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Catalog, Search, FAQ, News, Contacts, Random, Theme } from '../NavItems';
import styles from './Header.module.scss';

const HeaderNavbar = () => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);

  const navbarClasses = cx(
    styles.navbar,
    'justify-content-center'
  );

  return (
    <Navbar className={navbarClasses} variant={invertedColor} >
      <Nav><Catalog Component={Nav.Link} /></Nav>
      <Nav><Search Component={Nav.Link} /></Nav>
      <Nav><News Component={Nav.Link} /></Nav>
      <Nav><NavDropdown menuVariant={invertedColor}>
        <FAQ Component={NavDropdown.Item} options={{ invertedHovered: true }} />
        <Contacts Component={NavDropdown.Item} options={{ invertedHovered: true }} />
        <NavDropdown.Divider />
        <Random Component={NavDropdown.Item} options={{ invertedHovered: true }} />
        <Theme Component={NavDropdown.Item} options={{ className: 'd-lg-none', shouldInverted: true }} />
      </NavDropdown></Nav>
    </Navbar>
  );
};

export default HeaderNavbar;
