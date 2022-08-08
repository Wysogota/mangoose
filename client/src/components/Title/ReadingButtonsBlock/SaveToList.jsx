import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { capitalize } from 'lodash';
import { Dropdown } from 'react-bootstrap';
import cx from 'classnames';
import CONSTANTS from '../../../constants';
const { MANGA_LIST_NAMES, DEFAULT_SAVE_BUTTON_VALUE } = CONSTANTS;
import styles from './ReadingButtonsBlock.module.scss';
import { useParams } from 'react-router-dom';
import { useLoading } from '../../../hooks';

const SaveToList = () => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const { token } = useSelector(({ auth }) => auth);
  const { list, lists, isFetching } = useSelector(({ mangaLists }) => mangaLists);
  const { saveMangaToList, removeMangaFromList, getList } = bindActionCreators(actionCreators, useDispatch());
  const [listName, setListName] = useState(DEFAULT_SAVE_BUTTON_VALUE);
  const { mangaId } = useParams();

  useEffect(() => getList({ token, mangaId }), [lists]);
  useEffect(() => list && setListName(list), [list]);

  const classes = cx(
    styles.font_weight,
    'w-100 mb-3 pt-2 pb-2 text-uppercase',
  );

  const onClickHandle = (list) => {
    if (listName === list) {
      removeMangaFromList({ mangaId, list, token });
      setListName(DEFAULT_SAVE_BUTTON_VALUE);
    } else {
      saveMangaToList({ mangaId, list, token });
      setListName(list);
    }
  };

  const loading = useLoading({ data: list, isFetching, spinner: false });
  if (loading) return loading;

  return (
    <Dropdown>
      <Dropdown.Toggle className={classes} variant={invertedColor}>
        {listName}
      </Dropdown.Toggle>
      <Dropdown.Menu variant={invertedColor}>
        {Object.values(MANGA_LIST_NAMES).map((listName) =>
          <Dropdown.Item
            key={listName} eventKey={listName}
            onClick={() => onClickHandle(listName)}
            active={listName === list}
          >
            {capitalize(listName)}
          </Dropdown.Item>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default SaveToList;
