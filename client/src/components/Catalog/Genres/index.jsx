import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Accordion } from 'react-bootstrap';
import GenreButton from '../GenreButton/GenreButton';
import ToggleTab from '../../ToggleTab';
import { useCheckingEmptyValues } from '../../../hooks';
import CONSTANTS from '../../../constants';
import { capitalize } from 'lodash';
const { DEFAULT_LOCALE } = CONSTANTS;

const defaultTags = [
  'time', 'author', 'artist',
];

const Genres = ({ setGenres }) => {

  const { tags, isFetching } = useSelector(({ tags }) => tags);
  const { getTagList } = bindActionCreators(actionCreators, useDispatch());
  useEffect(() => getTagList(), []);

  const onClickHandle = (title) => {
    setGenres((prevGenres) => {
      title = title.toLowerCase();
      return (prevGenres.includes(title))
        ? prevGenres.filter((item) => item !== title)
        : prevGenres.concat(title);
    });

    
  };

  const fetching = useCheckingEmptyValues(tags, 'Fail to load', isFetching);
  if (fetching) return fetching;

  const tagGroupNames = [
    ...new Set(tags.map(({ group }) => group)),
    ...defaultTags,
  ];

  const getTagsByGroup = (groupName) => [
    ...new Set(tags
      .filter(({ group }) => group === groupName)
      .map(({ name }) => name[DEFAULT_LOCALE])
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
            getTagsByGroup(group).map((title) =>
              <GenreButton
                key={title} title={title} to={'#'}
                onClick={() => onClickHandle(title)}
              />
            )
          }</>
        </Accordion.Collapse>
      )}
    </Accordion >
  );
};

export default Genres;
