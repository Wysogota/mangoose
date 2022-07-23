import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { Container, Row, Col } from 'react-bootstrap';
import HeaderNavbar from './HeaderNavbar';
import HeaderSidebar from './BurgerButton';
import Logo from '../Logo';
import ToggleTheme from '../ToggleTheme';
import styles from './Header.module.scss';
import HeaderAuthButtons from './HeaderAuthButtons';

const Header = () => {
  const { theme: { mainTheme, bgTheme } } = useSelector(({ themes }) => themes);

  const headerClasses = cx(
    styles.header,
    styles.fixed,
    mainTheme,
    bgTheme,
  );

  return (
    <Container fluid id='header' className={headerClasses}>
      <Row className='justify-content-center'>
        <Col xs='2' sm='1' className='d-md-none'> <HeaderSidebar /> </Col>
        <Col sm='4' md='3' lg='4' className='d-none d-sm-block text-md-center'><Logo /></Col>
        <Col md='6' lg='4' className='d-none d-md-block'><HeaderNavbar /></Col>
        <Col xs='10' sm='6' md='3' lg='4' className='text-end text-md-center'>
          <HeaderAuthButtons />
          <ToggleTheme Component='button' btnClasses='ps-3 d-none d-lg-inline-block' imageClasses='fs-3' />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
