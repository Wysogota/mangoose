import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import { Button, ButtonGroup, Col, Container, Row } from 'react-bootstrap';
import HeaderNavbar from './HeaderNavbar';
import HeaderSidebar from './HeaderSidebar';
import Logo from '../Logo';
import ToggleTheme from '../ToggleTheme';
import styles from './Header.module.scss';
import themes from '../../common/styles/theme.module.scss';
import CONSTANTS from '../../constants';
const { breakpoints } = CONSTANTS;

const Header = () => {
  const { theme: { mainColor, bgColor, invertedColor, outlineColor } } = useSelector(({ themes }) => themes);
  const { showSignIn } = bindActionCreators(actionCreators, useDispatch());
  
  const [scrolled, setScrolled] = useState(window.scrollY !== 0);
  const [showLogo, setShowLogo] = useState(window.innerWidth >= breakpoints.sm);
  const [showNavbar, setShowNavbar] = useState(window.innerWidth >= breakpoints.md);
  const [showToggleTheme, setToggleTheme] = useState(window.innerWidth >= breakpoints.c_lg);

  useEffect(() => {
    window.onscroll = () => setScrolled(window.scrollY !== 0);
    window.onresize = () => {
      setShowLogo(window.innerWidth >= breakpoints.sm);
      setShowNavbar(window.innerWidth >= breakpoints.md);
      setToggleTheme(window.innerWidth >= breakpoints.c_lg);
    };
  }, []);


  const headerClasses = cx(
    styles.header,
    themes[mainColor], themes[bgColor],
    scrolled && styles.scrolled
  );

  return (
    <Container fluid className={headerClasses}>
      <Row className='justify-content-center'>
        {!showNavbar && <Col xs='2' sm='1'> <HeaderSidebar /> </Col>}
        {showLogo && <Col sm='4' md='3' lg='4' className='text-md-center'> <Logo /> </Col>}
        {showNavbar && <Col md='6' lg='4'><HeaderNavbar showToggleTheme={showToggleTheme} /></Col>}
        <Col xs='10' sm='6' md='3' lg='4' className='text-end text-md-center'>
          <ButtonGroup className='pt-2 pb-2'>
            <Button onClick={showSignIn} variant={outlineColor}>Sign In</Button>
            <Button as={Link} to='/signup' variant={invertedColor}>Sign Up</Button>
          </ButtonGroup>
          {showToggleTheme && <ToggleTheme Component='button' btnClasses='ps-3' imageClasses='fs-3' />}
        </Col>
      </Row>
    </Container>
  );
};

export default Header;
