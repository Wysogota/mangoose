import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { capitalize, isEmpty } from 'lodash';
import { Accordion } from 'react-bootstrap';
import ProfileCards from './ProfileCards';
import MinorHeader from '../../components/Headers/MinorHeader';
import { useLoading } from '../../hooks';
import CONSTANTS from '../../constants';
const { MANGA_LIST_NAMES } = CONSTANTS;

const ProfileLists = () => {
  const { theme: { invertedColor, bgAccentTheme } } = useSelector(({ themes }) => themes);
  const { listIds, isFethcing } = useSelector(({ mangaLists }) => mangaLists);
  const { token } = useSelector(({ auth }) => auth);
  const { getMangaLists, clearMangaCatalog } = bindActionCreators(actionCreators, useDispatch());

  useEffect(() => {
    getMangaLists({ token });
    return clearMangaCatalog;
  }, []);

  const classes = cx(
    `accordion-${invertedColor} inverted`,
    bgAccentTheme,
    'rounded mb-3',
  );

  const loading = useLoading({ data: listIds, isFethcing });
  if (loading) return loading;

  return (
    Object.values(MANGA_LIST_NAMES).map((listName) =>
      <Accordion key={listName} className={classes} defaultActiveKey={listName}>
        <Accordion.Item eventKey={listName}>
          <Accordion.Header>{capitalize(listName)}</Accordion.Header>
          <Accordion.Body>
            {!isEmpty(listIds[listName])
              ? <ProfileCards ids={listIds[listName]} listName={listName} />
              : <MinorHeader className='text-center mt-5 mb-5 fs-3'>{`No ${listName} manga`}</MinorHeader>
            }
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    )
  );
};

export default ProfileLists;
