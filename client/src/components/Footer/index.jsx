import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Container, Col, Row, Navbar, Nav } from 'react-bootstrap';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Logo from '../Logo';
import NavItems from '../NavItems';
import styles from './Footer.module.scss';
import CONSTANTS from '../../constants';
const { FAQ, News, Contacts, Github } = NavItems;

const Footer = () => {
  const { theme: { mainTheme, bgTheme, hoveredTheme, mainColor, invertedColor } } = useSelector(({ themes }) => themes);
  const [year, setYear] = useState(new Date().getFullYear());
  useEffect(() => {
    const currentYear = new Date().getFullYear();
    if (year !== currentYear) setYear(currentYear);
  }, []);

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
    <Container fluid className={footerClasses}>
      <Row>
        <Col xs='6' sm='6' md='3' lg='4'>
          <Logo className='d-flex align-items-center justify-content-md-center h-100' />
        </Col>
        <Col md='6' lg='4' className='d-none d-md-flex justify-content-center'>
          <Navbar className={infoPagesClasses} variant={invertedColor}>
            <Nav>{FAQ(Nav.Link)}</Nav>
            <Nav>{News(Nav.Link)}</Nav>
            <Nav>{Contacts(Nav.Link)}</Nav>
          </Navbar>
        </Col>
        <Col xs='6' sm='6' md='3' lg='4'>
          <Navbar className='h-100 justify-content-md-center justify-content-end'>
            <div className='d-flex flex-column align-items-end'>
              <Nav className='p-2 pb-0 text-nowrap'><Nav.Item>Designed by Wysogota</Nav.Item></Nav>
              <Nav className='p-2 pb-0 pt-0'>{Github(Nav.Link)}</Nav>
            </div>
          </Navbar>
        </Col>
      </Row>
      <Row className={styles[mainColor + '_down_footer']}>
        <Col className='d-flex justify-content-center'>
          <span className={yearClasses}>© {year} ✿</span>
          <Link to='/' className={hoveredTheme}>{CONSTANTS.WEBSITE_NAME}</Link>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
