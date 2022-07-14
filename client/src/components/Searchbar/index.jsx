import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Modal } from 'react-bootstrap';
import cx from 'classnames';
import styles from './Searchbar.module.scss';
import SearchInput from './SearchInput';
import SearchResult from './SearchResult';
import { isEmpty } from 'lodash';

const limit = 5;

const Searchbar = () => {
  const { theme: { mainTheme, bgTheme } } = useSelector(({ themes }) => themes);
  const { isSearchbarOpen } = useSelector(({ modalItems }) => modalItems);
  const { mangaSearch } = useSelector(({ mangaSearch }) => mangaSearch);
  const { hideSearchbar, clearMangaSearch } = bindActionCreators(actionCreators, useDispatch());

  const onEnterHandle = () => document.getElementsByClassName('modal')[0].classList.add(styles.searchbar_zIndex);
  const onHideHandle = () => {
    if (isEmpty(mangaSearch)) clearMangaSearch();
    hideSearchbar();
  };

  const backdropClasses = cx(
    styles.backdrop,
    'searchbar'
  );

  const contentClasses = cx(
    mainTheme,
    bgTheme,
    styles.content,
    'rounded-bottom',
  );

  return (
    <Modal
      show={isSearchbarOpen} onHide={onHideHandle} onEntered={onEnterHandle} size='lg'
      dialogClassName={styles.searchbar} contentClassName={contentClasses} backdropClassName={backdropClasses}
    >
      <Modal.Header>
        <SearchInput limit={limit} />
      </Modal.Header>
      <Modal.Body>
        <SearchResult />
      </Modal.Body>
    </Modal>
  );
};

export default Searchbar;
