import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { Modal, Nav, Navbar } from 'react-bootstrap';
import Logo from '../Logo';
import * as NavItems from '../NavItems';
import Avatar from '../Avatar';
import UserMenu from '../UserMenu';
import SignOut from '../UserMenu/SignOut';
import styles from './Sidebar.module.scss';
import CONSTANTS from '../../constants';
const { breakpoints } = CONSTANTS;

const filterList = [
  'Github', 'MangaDex', 'IconDesigner'
];

const Sidebar = () => {
  const { theme: { mainTheme, bgTheme, hoveredTheme, bgInvertedHoveredTheme, invertedColor } } = useSelector(({ themes }) => themes);
  const { isSidebarOpen } = useSelector(({ modalItems }) => modalItems);
  const { isAuthorized } = useSelector(({ auth }) => auth);
  const { hideSidebar, showSignIn } = bindActionCreators(actionCreators, useDispatch());

  useEffect(() => {
    const hideSidebarHandle = () => {
      if (window.innerWidth >= breakpoints.md) hideSidebar();
    };

    window.addEventListener('resize', hideSidebarHandle);
    return () => window.removeEventListener('resize', hideSidebarHandle);
  }, []);

  const signInOnClick = () => {
    showSignIn();
    hideSidebar();
  };

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
        <Navbar variant={invertedColor} className='flex-grow-1'>
          <Nav className='flex-grow-1'>
            {isAuthorized ? (<>
              <Nav.Item><UserMenu itemOnClick={hideSidebar} direction='up' sidebar /></Nav.Item>
              <SignOut Component={Nav.Item} className={signInClasses} onClick={hideSidebar} />
            </>) : (<>
              <Nav.Item><Avatar compact /></Nav.Item>
              <Nav.Item onClick={signInOnClick} className={signInClasses}>Sign in</Nav.Item>
            </>)
            }
          </Nav>
        </Navbar>
      </Modal.Footer>
    </Modal>

  );
};

export default Sidebar;
