import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Modal } from 'react-bootstrap';
import cx from 'classnames';
import styles from './Searchbar.module.scss';
import SearchInput from './SearchInput';

const Searchbar = () => {

  const { theme: { mainTheme, bgTheme } } = useSelector(({ themes }) => themes);
  const { isSearchbarOpen } = useSelector(({ modalItems }) => modalItems);
  const { hideSearchbar } = bindActionCreators(actionCreators, useDispatch());

  const onEnterHandle = () => document.getElementsByClassName('modal')[0].classList.add(styles.searchbar_zIndex);

  const backdropClasses = cx(
    styles.backdrop,
    'searchbar'
  );

  const contentClasses = cx(
    mainTheme,
    bgTheme,
    styles.content,
  );

  return (
    <Modal
      show={isSearchbarOpen} onHide={hideSearchbar} onEntered={onEnterHandle}
      dialogClassName={styles.searchbar} contentClassName={contentClasses} backdropClassName={backdropClasses}
    >
      <Modal.Header>
        <SearchInput />
      </Modal.Header>
      <Modal.Body>
      </Modal.Body>

    </Modal>
  );
};

export default Searchbar;
