import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { capitalize } from 'lodash';
import { Dropdown } from 'react-bootstrap';
import cx from 'classnames';
import CONSTANTS from '../../../constants';
const { MANGA_LIST_NAMES } = CONSTANTS;
import styles from './ReadingButtonsBlock.module.scss';
import { useParams } from 'react-router-dom';
import { useLoading } from '../../../hooks';

const SaveToList = () => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const { token } = useSelector(({ auth }) => auth);
  const { list, lists, isFetching } = useSelector(({ mangaLists }) => mangaLists);
  const { saveMangaToList, getList } = bindActionCreators(actionCreators, useDispatch());
  const { mangaId } = useParams();

  useEffect(() => getList({ token, mangaId }), [lists]);

  const classes = cx(
    styles.font_weight,
    'w-100 mb-3 pt-2 pb-2 text-uppercase',
  );

  const onClickHandle = (list) => saveMangaToList({ mangaId, list, token });

  const loading = useLoading({ data: list, isFetching, spinner: false });
  if (loading) return loading;

  return (
    <Dropdown>
      <Dropdown.Toggle className={classes} variant={invertedColor}>
        Save to list
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
