import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Catalog, Search, FAQ, News, Contacts, Random, Theme } from '../NavItems';
import styles from './Header.module.scss';

const HeaderNavbar = () => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const { clearMangaSearch, hideSearchbar } = bindActionCreators(actionCreators, useDispatch());
  
  const CatalogOnClickHandle = () => {
    clearMangaSearch();
    hideSearchbar();
  };

  const navbarClasses = cx(
    styles.navbar,
    'justify-content-center'
  );

  return (
    <Navbar className={navbarClasses} variant={invertedColor} >
      <Nav><Catalog Component={Nav.Link} options={{ onClick: CatalogOnClickHandle }} /></Nav>
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
