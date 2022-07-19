import React from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { capitalize } from 'lodash';
import { Accordion } from 'react-bootstrap';
import GenreButton from '../GenreButton';
import ToggleTab from '../../ToggleTab';
import CONSTANTS from '../../../constants';
const {
  DEFAULT_LOCALE,
  PARAM_NAME: { FILTER: { TAGS } },
  PAGES: { CATALOG: { path } },
} = CONSTANTS;

const getTagsByGroup = (tags, groupName) => [
  ...new Set(tags
    .filter(({ group }) => group === groupName)
    .map(({ id, name }) => ({ id, name: name[DEFAULT_LOCALE], type: TAGS }))
  )
];

const TagsTab = (props) => {
  const { tagGroupNames, tabRef, focusedTab } = props;
  const { tags } = useSelector(({ tags }) => tags);
  const [searchParams] = useSearchParams();

  const hasSelectedTags = (group) => getTagsByGroup(tags, group).some(
    ({ id, type }) => searchParams.getAll(type).includes(id)
  );

  return (
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
};

const TagsItems = (props) => {
  const { tagGroupNames, redirect } = props;
  const { tags } = useSelector(({ tags }) => tags);
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

  return (
    tagGroupNames.map((group, i) =>
      <Accordion.Collapse key={group} eventKey={i + 1}>
        <>{getTagsByGroup(tags, group).map(({ id, name, type }) =>
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
};

export { TagsTab, TagsItems };