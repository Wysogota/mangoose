import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import { FAQ, News, Contacts, Github, MangaDex, IconDesigner } from '../NavItems';
import styles from './Footer.module.scss';
import CONSTANTS from '../../constants';
const { WEBSITE_NAME, PAGES: { HOME: { path: HOME_PATH } } } = CONSTANTS;

const Footer = () => {
  const { theme: { mainTheme, bgTheme, hoveredTheme, mainColor, invertedColor } } = useSelector(({ themes }) => themes);
  const year = new Date().getFullYear();

  const footerClasses = cx(
    styles.footer,
    mainTheme,
    bgTheme,
  );

  const infoPagesClasses = cx(
    styles.info_pages,
    'h-100'
  );

  const yearClasses = cx(
    styles.year,
    styles[mainColor + '_year']
  );

  return (
    <Container fluid id='footer' className={footerClasses}>
      <Row>
        <Col
          xs='6' sm='6' md='3' lg='4'
          className='d-flex flex-column align-items-center justify-content-md-center'
        >
          <Logo />
          <IconDesigner />
        </Col>
        <Col md='6' lg='4' className='d-none d-md-flex justify-content-center'>
          <Navbar className={infoPagesClasses} variant={invertedColor}>
            <Nav><FAQ Component={Nav.Link} /></Nav>
            <Nav><News Component={Nav.Link} /></Nav>
            <Nav><Contacts Component={Nav.Link} /></Nav>
          </Navbar>
        </Col>
        <Col xs='6' sm='6' md='3' lg='4'>
          <Navbar className='h-100 justify-content-md-center justify-content-end'>
            <div className='d-flex' >
              <Nav className='p-2 pb-0 text-nowrap flex-column' >
                <Nav.Item><Github Component={Nav.Link} /></Nav.Item>
                <Nav.Item><MangaDex Component={Nav.Link} /></Nav.Item>
              </Nav>
            </div>
          </Navbar>
        </Col>
      </Row>
      <Row className={styles[mainColor + '_down_footer']}>
        <Col className='d-flex justify-content-center'>
          <span className={yearClasses}>© {year} ✿</span>
          <Link to={HOME_PATH} className={hoveredTheme}>{WEBSITE_NAME}</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
