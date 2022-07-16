import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { useSearchParams } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import GenreButton from '../GenreButton/GenreButton';
import ToggleTab from '../../ToggleTab';
import { useCheckingEmptyValues } from '../../../hooks';
import CONSTANTS from '../../../constants';
import { capitalize } from 'lodash';

const { DEFAULT_LOCALE, PARAM_NAME: { FILTER: { TAGS } } } = CONSTANTS;

const defaultTags = [
  'order', 'author', 'artist',
];

const Genres = () => {
  const { tags, isFetching } = useSelector(({ tags }) => tags);
  const { getTagList } = bindActionCreators(actionCreators, useDispatch());
  useEffect(() => getTagList(), []);
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickHandle = (name, value) => {
    const existedValues = searchParams.getAll(name);
    searchParams.delete(name);
    if (existedValues.includes(value)) {
      existedValues
        .filter((existedValue) => existedValue !== value)
        .forEach((value) => searchParams.append(name, value));
    } else {
      existedValues.push(value);
      existedValues.forEach((value) => searchParams.append(name, value));
    }
    setSearchParams(searchParams, { replace: true });

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
                key={name} id={id} title={name} to={'#'}
                onClick={() => onClickHandle(TAGS, id)}
              />
            )
          }</>
        </Accordion.Collapse>
      )}
    </Accordion >
  );
};

export default Genres;
