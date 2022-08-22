import React from 'react';
import { useSelector } from 'react-redux';
import { Tab } from 'react-bootstrap';
import Tabs from '../../components/Tabs';
import TabLink from '../../components/Tabs/TabLink';
import ProfileLists from './ProfileLists';
import ProfileManage from './ProfileManage';
import { useLoading } from '../../hooks';
import CONSTANTS from '../../constants';
const {
  TITLE_TABS: { RECENTLY_READ, MANGA_LISTS, COMMENTS, MANAGE },
  PERMISSION: { RECOMMENDATION },
} = CONSTANTS;

const ProfileTabs = () => {
  const { me, isFetching } = useSelector(({ me }) => me);

  const loading = useLoading({ data: me, isFetching, title: 'wait', spinner: false });
  if (loading) return loading;

  return (
    <Tabs defaultTab={MANGA_LISTS.type}>
      <Tab eventKey={RECENTLY_READ.type} title={<TabLink to={RECENTLY_READ.type}>{RECENTLY_READ.title}</TabLink>} disabled>
      </Tab>
      <Tab eventKey={MANGA_LISTS.type} title={<TabLink to={MANGA_LISTS.type}>{MANGA_LISTS.title}</TabLink>}>
        <ProfileLists />
      </Tab>
      <Tab eventKey={COMMENTS.type} title={<TabLink to={COMMENTS.type}>{COMMENTS.title}</TabLink>} disabled>
      </Tab>
      {me.permissions.includes(RECOMMENDATION) &&
        <Tab eventKey={MANAGE.type} title={<TabLink to={MANAGE.type}>{MANAGE.title}</TabLink>}>
          <ProfileManage />
        </Tab>
      }
    </Tabs >
  );
};

export default ProfileTabs;
