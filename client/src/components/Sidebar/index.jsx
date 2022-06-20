import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { Modal, Nav, Navbar } from 'react-bootstrap';
import NavItems from '../NavItems';
import Avatar from '../Avatar';
import CloseButton from '../CloseButton';
import themes from '../../common/styles/theme.module.scss';
import styles from './Sidebar.module.scss';
import CONSTANTS from '../../constants';
const { breakpoints } = CONSTANTS;

const Sidebar = () => {
  const { theme: { mainColor, bgColor, invertedColor } } = useSelector(({ themes }) => themes);
  const { isSidebarOpen } = useSelector(({ sidebar }) => sidebar);
  const { hideSidebar, showSignIn } = bindActionCreators(actionCreators, useDispatch());

  const contentClasses = cx(
    themes[mainColor],
    themes[bgColor],
    styles.content,
  );

  const itemClasses = cx(
    themes[bgColor],
    styles.item,
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
        <Navbar variant={invertedColor} onClick={hideSidebar}>
          <Nav>
            <Avatar />
            <Nav.Link href="#" onClick={showSignIn}>Sign in</Nav.Link>
          </Nav>
        </Navbar>
        <CloseButton onClick={hideSidebar} />
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
      <Modal.Footer>

      </Modal.Footer>
    </Modal>

  );
};

export default Sidebar;
