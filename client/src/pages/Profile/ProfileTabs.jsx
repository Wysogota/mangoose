import React from 'react';
import { useSelector } from 'react-redux';
import { Tab } from 'react-bootstrap';
import Tabs from '../../components/Tabs';
import TabLink from '../../components/Tabs/TabLink';
import ProfileLists from './ProfileLists';
import ProfileManage from './ProfileManage';
import CONSTANTS from '../../constants';
import { useLoading } from '../../hooks';
const {
  TITLE_TABS: { USER_MANGA_LISTS, COMMENTS, MANAGE },
  PERMISSION: { RECOMMENDATION },
} = CONSTANTS;

const ProfileTabs = () => {
  const { me, isFetching } = useSelector(({ me }) => me);

  const loading = useLoading({ data: me, isFetching, title: 'wait', spinner: false });
  if (loading) return loading;

  return (
    <Tabs defaultTab={USER_MANGA_LISTS}>
      <Tab eventKey={USER_MANGA_LISTS} title={<TabLink to={USER_MANGA_LISTS}>Manga Lists</TabLink>}>
        <ProfileLists />
      </Tab>
      <Tab eventKey={COMMENTS} title={<TabLink to={COMMENTS}>Commets</TabLink>}>
      </Tab>
      {me.permissions.includes(RECOMMENDATION) &&
        <Tab eventKey={MANAGE} title={<TabLink to={MANAGE}>Manage</TabLink>}>
          <ProfileManage />
        </Tab>
      }
    </Tabs >
  );
};

export default ProfileTabs;
