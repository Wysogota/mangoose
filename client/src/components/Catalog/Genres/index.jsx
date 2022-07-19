import React, { useEffect, useRef, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { useSearchParams } from 'react-router-dom';
import { capitalize } from 'lodash';
import { Accordion } from 'react-bootstrap';
import GenreButton from '../GenreButton';
import ToggleTab from '../../ToggleTab';
import SearchingInput from '../../SearchingInput';
import Sort from '../Sort';
import { useCheckingEmptyValues } from '../../../hooks';
import CONSTANTS from '../../../constants';
const {
  DEFAULT_LOCALE,
  PARAM_NAME: { FILTER, FILTER: { TAGS } },
  PAGES: { CATALOG: { path } },
} = CONSTANTS;

const authors = [
  'author', 'artist',
];

const Genres = (props) => {
  const { redirect } = props;
  const { tags, isFetching } = useSelector(({ tags }) => tags);
  const { getTagList } = bindActionCreators(actionCreators, useDispatch());
  const [searchParams, setSearchParams] = useSearchParams();

  const tabRef = useRef([]);
  const [focusedTab, setFocusedTab] = useState();

  useEffect(() => {
    getTagList();

    const focusHandle = () => {
      if (tabRef.current.some((tab) => tab === document.activeElement))
        setFocusedTab(document.activeElement);
    };

    document.addEventListener('focusin', focusHandle);
    return () => document.removeEventListener('focusin', focusHandle);
  }, []);

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
  ];

  const getTagsByGroup = (groupName) => [
    ...new Set(tags
      .filter(({ group }) => group === groupName)
      .map(({ id, name }) => ({ id, name: name[DEFAULT_LOCALE], type: TAGS }))
    )
  ];

  const hasSelectedTags = (group) => getTagsByGroup(group).some(
    ({ id, type }) => searchParams.getAll(type).includes(id)
  );

  const TagsTab = () => (
    <div className='mb-2'>{
      tagGroupNames.map((group, i) =>
        <ToggleTab key={group}
          eventKey={i + 1}
          ref={(tag) => tabRef.current[i] = tag}
          focused={tabRef.current[i] === focusedTab}
          selected={hasSelectedTags(group)}
        >
          By {capitalize(group)}
        </ToggleTab>
      )
    }</div>
  );

  const TagsItems = () => (
    tagGroupNames.map((group, i) =>
      <Accordion.Collapse key={group} eventKey={i + 1}>
        <>{getTagsByGroup(group).map(({ id, name, type }) =>
          <GenreButton
            key={name} id={id}
            title={name}
            to={redirect && `${path}?${type}=${id}`}
            onClick={() => onClickHandle(type, id)}
          />
        )}</>
      </Accordion.Collapse>
    )
  );

  const AuthorsTab = () => (
    <div>{
      authors.map((author, i) => {
        const eventKey = i + tagGroupNames.length;
        return (
          <ToggleTab key={author}
            eventKey={eventKey + 1}
            ref={(tag) => tabRef.current[eventKey] = tag}
            focused={tabRef.current[eventKey] === focusedTab}
          >
            By {capitalize(author)}
          </ToggleTab>
        );
      })
    }</div>
  );

  const AuthorsItems = () => {

    const onChangeHandle = (key, value) => {
      value
        ? searchParams.set(key, value)
        : searchParams.delete(key);

      setSearchParams(searchParams, { replace: true });
    };

    return (
      authors.map((author, i) =>
        <Accordion.Collapse key={author} eventKey={i + 1 + tagGroupNames.length} >
          <SearchingInput
            containerClassName='mb-3'
            placeholder={capitalize(author)}
            value={searchParams.get(FILTER[author.toUpperCase()]) || ''}
            onChange={(e) => onChangeHandle(author, e.target.value)}
          />
        </Accordion.Collapse>
      )
    );
  };

  return (
    <Accordion>
      <div className='mb-2 d-flex align-items-center justify-content-between'>
        <div className='w-100'>
          {TagsTab()}
          {AuthorsTab()}
        </div>
        <Sort />
      </div>
      {TagsItems()}
      {AuthorsItems()}
    </Accordion >
  );
};

export default Genres;
