import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { Button, ButtonGroup, Col, Container, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import {
  BsGridFill as CatalogIcon, BsSearch as SearchIcon, BsFillQuestionCircleFill as FAQIcon,
  BsNewspaper as NewsIcon, BsFillEnvelopeFill as ContactsIcon, BsShuffle as RandomIcon
} from 'react-icons/bs';
import Logo from '../Logo';
import ToggleTheme from '../ToggleTheme';
import styles from './Header.module.scss';

const Header = () => {
  const { isDarkTheme } = useSelector(({ themes }) => themes);

  const headerClasses = cx(
    styles.header,
    isDarkTheme ? styles.dark_theme : styles.light_theme
  );

  const [theme, setTheme] = useState("dark");
  useEffect(() => setTheme(isDarkTheme ? "light" : "dark"), [isDarkTheme]);

  return (
    <Container fluid className={headerClasses} >
      <Row>
        <Col>
          <Logo />
        </Col>
        <Col>
          <Navbar variant={theme} className={styles.navbar}>
            <Nav><Nav.Link href="#"><CatalogIcon /><span>Catalog</span></Nav.Link></Nav>
            <Nav><Nav.Link href="#"><SearchIcon /><span>Search</span></Nav.Link></Nav>
            <Nav><Nav.Link href="#"><FAQIcon /><span>FAQ</span></Nav.Link></Nav>
            <Nav>
              <NavDropdown menuVariant={theme}>
                <NavDropdown.Item href="#"><NewsIcon /><span>News</span></NavDropdown.Item>
                <NavDropdown.Item href="#"><ContactsIcon /><span>Contacts</span></NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#"><RandomIcon /><span>Random</span></NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar>
        </Col>
        <Col>
          <ButtonGroup>
            <Button as={Link} to="/signin" variant={"outline-" + theme}>Sign In</Button>
            <Button as={Link} to="/signup" variant={theme}>Sign Up</Button>
          </ButtonGroup>
          <ToggleTheme className={styles.padding_left} />
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
