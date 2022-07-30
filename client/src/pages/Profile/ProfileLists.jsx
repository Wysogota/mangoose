import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { capitalize, isEmpty } from 'lodash';
import { Accordion } from 'react-bootstrap';
import ProfileCards from './ProfileCards';
import { useLoading } from '../../hooks';
import CONSTANTS from '../../constants';
const { MANGA_LIST_NAMES } = CONSTANTS;

const ProfileLists = () => {
  const { theme: { invertedColor, bgAccentTheme } } = useSelector(({ themes }) => themes);
  const { lists, isFetching } = useSelector(({ mangaLists }) => mangaLists);
  const { token } = useSelector(({ auth }) => auth);
  const { mangaCatalog } = useSelector(({ mangaCatalog }) => mangaCatalog);
  const { getMangaLists, getMangaCatalog } = bindActionCreators(actionCreators, useDispatch());
  const [listedManga, setListedManga] = useState([]);

  useEffect(() => getMangaLists({ token }), []);

  useEffect(() => {
    const ids = Object.values(lists).flat();
    getMangaCatalog({ ids, limit: ids.length });
  }, [lists]);

  useEffect(() => {
    if (!isEmpty(mangaCatalog)) {
      const IdsWithList = Object.entries(lists)
        .map(([list, array]) => array.map((id) => ({ id, list })))
        .flat();

      setListedManga(
        mangaCatalog.map(t1 => ({
          ...t1, ...IdsWithList.find(t2 => t2.id === t1.id)
        }))
      );
    }
  }, [mangaCatalog]);

  const filteredManga = (listName) => listedManga.filter(({ list }) => list === listName);

  const classes = cx(
    `accordion-${invertedColor}`,
    bgAccentTheme,
    'rounded mb-3',
  );

  const loading = useLoading({ data: listedManga, isFetching });
  if (loading) return loading;

  return (
    <section>{
      Object.values(MANGA_LIST_NAMES).map((listName) =>
        <Accordion key={listName} className={classes} defaultActiveKey={listName}>
          <Accordion.Item eventKey={listName}>
            <Accordion.Header>{capitalize(listName)}</Accordion.Header>
            <Accordion.Body>
              <ProfileCards list={filteredManga(listName)} listName={listName}/>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )
    }</section>
  );
};

export default ProfileLists;
