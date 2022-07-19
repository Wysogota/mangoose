import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { capitalize } from 'lodash';
import { Accordion } from 'react-bootstrap';
import ToggleTab from '../../ToggleTab';
import SearchingInput from '../../SearchingInput';
import CONSTANTS from '../../../constants';
const { PARAM_NAME: { FILTER }, AUTHORS } = CONSTANTS;

const AuthorsTab = (props) => {
  const { tagsTabCount, tabRef, focusedTab } = props;
  const [searchParams] = useSearchParams();
  const hasSelectedAuthors = (author) => !!searchParams.get(author);

  return (
    <div>{
      AUTHORS.map((author, i) => {
        const eventKey = i + tagsTabCount;
        return (
          <ToggleTab key={author}
            eventKey={eventKey + 1}
            ref={(tag) => tabRef.current[eventKey] = tag}
            focused={tabRef.current[eventKey] === focusedTab}
            selected={hasSelectedAuthors(author)}
          >
            By {capitalize(author)}
          </ToggleTab>
        );
      })
    }</div>
  );
};

const AuthorsItems = (props) => {
  const { tagsTabCount } = props;
  const [searchParams, setSearchParams] = useSearchParams();

  const onChangeHandle = (key, value) => {
    value
      ? searchParams.set(key, value)
      : searchParams.delete(key);

    setSearchParams(searchParams, { replace: true });
  };

  return (
    AUTHORS.map((author, i) =>
      <Accordion.Collapse key={author} eventKey={i + 1 + tagsTabCount} >
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

export { AuthorsTab, AuthorsItems };