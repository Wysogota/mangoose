import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { Modal, Nav, Navbar } from 'react-bootstrap';
import Logo from '../Logo';
import * as NavItems from '../NavItems';
import Avatar from '../Avatar';
import styles from './Sidebar.module.scss';
import CONSTANTS from '../../constants';
const { breakpoints } = CONSTANTS;

const filterList = [
  'Github',
];

const Sidebar = () => {
  const { theme: { mainTheme, bgTheme, hoveredTheme, bgInvertedHoveredTheme, invertedColor } } = useSelector(({ themes }) => themes);
  const { isSidebarOpen } = useSelector(({ modalItems }) => modalItems);
  const { hideSidebar, showSignIn } = bindActionCreators(actionCreators, useDispatch());

  const contentClasses = cx(
    mainTheme,
    bgTheme,
    styles.content,
  );

  const itemClasses = cx(
    bgTheme,
    bgInvertedHoveredTheme,
    styles.item,
    'flex-grow-1 rounded'
  );

  const signInClasses = cx(
    styles.signIn,
    hoveredTheme,
    'flex-grow-1'
  );

  useEffect(() => {
    const hideSidebarHandle = () => {
      if (window.innerWidth >= breakpoints.md) hideSidebar();
    };

    window.addEventListener('resize', hideSidebarHandle);
    return () => window.removeEventListener('resize', hideSidebarHandle);
  }, []);

  return (
    <Modal show={isSidebarOpen} onHide={hideSidebar} dialogClassName={styles.sidebar} contentClassName={contentClasses}>
      <Modal.Header>
        <Logo onClick={hideSidebar} className='flex-grow-1' />
      </Modal.Header>
      <Modal.Body >
        <Navbar variant={invertedColor} className='h-100 flex-column align-items-stretch'>
          {Object.values(NavItems).filter(({ name }) => filterList.indexOf(name) < 0).map((Component) =>
            <Nav key={Component.name} onClick={hideSidebar} className={itemClasses}>{
              Component.name === 'Theme'
                ? <Component Component={Nav.Link} options={{ shouldInverted: true }} />
                : <Component Component={Nav.Link} />
            }</Nav>
          )}
        </Navbar>
      </Modal.Body>
      <Modal.Footer className='justify-content-start'>
        <Navbar variant={invertedColor} onClick={hideSidebar} className='flex-grow-1'>
          <Nav className='flex-grow-1'>
            <Avatar compact />
            <Nav.Item onClick={showSignIn} className={signInClasses}>Sign in</Nav.Item>
          </Nav>
        </Navbar>
      </Modal.Footer>
    </Modal>

  );
};

export default Sidebar;
