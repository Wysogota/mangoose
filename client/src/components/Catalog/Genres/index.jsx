import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Accordion } from 'react-bootstrap';
import GenreButton from '../GenreButton/GenreButton';
import ToggleTab from '../../ToggleTab';
import { useCheckingEmptyValues } from '../../../hooks';
import CONSTANTS from '../../../constants';
import { capitalize } from 'lodash';
import { useSearchParams } from 'react-router-dom';
const { DEFAULT_LOCALE } = CONSTANTS;

const defaultTags = [
  'order', 'author', 'artist',
];

const paramNames = {
  includedTags: 'includedTags',
  order: 'order',
  author: 'author',
  artist: 'artist',
};

const Genres = () => {

  const { tags, isFetching } = useSelector(({ tags }) => tags);
  const { getTagList } = bindActionCreators(actionCreators, useDispatch());
  useEffect(() => getTagList(), []);
  const [genres, setGenres] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickHandle = (title) => {
    setGenres((prevGenres) => {
      title = title.toLowerCase();
      return (prevGenres.includes(title))
        ? prevGenres.filter((item) => item !== title)
        : prevGenres.concat(title);
    });
  };

  useEffect(() => {
    const { includedTags } = paramNames;
    searchParams.delete(...Object.values(paramNames));
    genres.forEach((tag) => searchParams.append(includedTags, tag));
    setSearchParams(searchParams);
  }, [genres]);

  const fetching = useCheckingEmptyValues(tags, 'Fail to load', isFetching);
  if (fetching) return fetching;

  const tagGroupNames = [
    ...new Set(tags.map(({ group }) => group)),
    ...defaultTags,
  ];

  const getTagsByGroup = (groupName) => [
    ...new Set(tags
      .filter(({ group }) => group === groupName)
      .map(({ id, name }) => ({ id, name: name[DEFAULT_LOCALE] }))
    )
  ];

  return (
    <Accordion>
      <div className='mb-2'>
        {tagGroupNames.map((group, i) =>
          <ToggleTab key={group} eventKey={i + 1}>By {capitalize(group)}</ToggleTab>
        )}
      </div>
      {tagGroupNames.map((group, i) =>
        <Accordion.Collapse key={group} eventKey={i + 1}>
          <>{
            getTagsByGroup(group).map(({ id, name }) =>
              <GenreButton
                key={name} title={name} to={'#'}
                onClick={() => onClickHandle(name)}
              />
            )
          }</>
        </Accordion.Collapse>
      )}
    </Accordion >
  );
};

export default Genres;
