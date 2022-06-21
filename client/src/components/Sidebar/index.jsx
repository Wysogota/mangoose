import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { Modal, Nav, Navbar } from 'react-bootstrap';
import Logo from '../Logo';
import NavItems from '../NavItems';
import Avatar from '../Avatar';
import CloseButton from '../CloseButton';
import themes from '../../common/styles/theme.module.scss';
import styles from './Sidebar.module.scss';
import CONSTANTS from '../../constants';
const { breakpoints } = CONSTANTS;

const Sidebar = () => {
  const { theme: { mainColor, bgColor, invertedColor, hovered, invertedHovered } } = useSelector(({ themes }) => themes);
  const { isSidebarOpen } = useSelector(({ sidebar }) => sidebar);
  const { hideSidebar, showSignIn } = bindActionCreators(actionCreators, useDispatch());

  const contentClasses = cx(
    themes[mainColor],
    themes[bgColor],
    styles.content,
  );

  const itemClasses = cx(
    themes[bgColor],
    themes[invertedHovered],
    styles.item,
    'flex-grow-1 rounded'
  );

  const signInClasses = cx(
    styles.signIn,
    themes[hovered],
    'flex-grow-1'
  );

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth >= breakpoints.md)
        hideSidebar();
    });
  }, []);

  return (
    <Modal show={isSidebarOpen} onHide={hideSidebar} dialogClassName={styles.sidebar} contentClassName={contentClasses}>
      <Modal.Header>
        <Logo onClick={hideSidebar} className='flex-grow-1'/>
      </Modal.Header>
      <Modal.Body >
        <Navbar variant={invertedColor} className='h-100 flex-column align-items-stretch'>
          {Object.values(NavItems).map((Component) =>
            <Nav key={Component.name} onClick={hideSidebar} className={itemClasses}>{
              Component(Nav.Link)
            }</Nav>
          )}
        </Navbar>
      </Modal.Body>
      <Modal.Footer className='justify-content-start'>
        <Navbar variant={invertedColor} onClick={hideSidebar} className='flex-grow-1'>
          <Nav className='flex-grow-1'>
            <Avatar />
            <Nav.Item onClick={showSignIn} className={signInClasses}>Sign in</Nav.Item>
          </Nav>
        </Navbar>
      </Modal.Footer>
    </Modal>

  );
};

export default Sidebar;
