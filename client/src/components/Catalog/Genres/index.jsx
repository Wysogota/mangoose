import React, { useEffect, useRef, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Accordion } from 'react-bootstrap';
import Sort from '../Sort';
import { useLoading } from '../../../hooks';
import { TagsItems, TagsTab } from './TagsAccordion';
import { AuthorsItems, AuthorsTab } from './AuthorsAccordion';

const Genres = (props) => {
  const { redirect } = props;
  const { tags, isFetching } = useSelector(({ tags }) => tags);
  const { getTagList } = bindActionCreators(actionCreators, useDispatch());

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

  const loading = useLoading({ data: tags, title: 'Fail to load', isFetching });
  if (loading) return loading;

  const tagGroupNames = [
    ...new Set(tags.map(({ group }) => group)),
  ];

  return (
    <Accordion>
      <div className='mb-2 d-flex align-items-center justify-content-between'>
        <div className='w-100'>
          <TagsTab
            tagGroupNames={tagGroupNames}
            tabRef={tabRef}
            focusedTab={focusedTab}
          />
          <AuthorsTab
            tagsTabCount={tagGroupNames.length}
            tabRef={tabRef}
            focusedTab={focusedTab}
          />
        </div>
        <Sort />
      </div>
      <TagsItems
        tagGroupNames={tagGroupNames}
        redirect={redirect}
      />
      <AuthorsItems
        tagsTabCount={tagGroupNames.length}
      />
    </Accordion >
  );
};

export default Genres;
