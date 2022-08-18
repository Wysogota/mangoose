import React from 'react';
import { Tab } from 'react-bootstrap';
import Tabs from '../../components/Tabs';
import TabLink from '../../components/Tabs/TabLink';
import CONSTANTS from '../../constants';
const { TITLE_TABS: { USER_MANGA_LISTS, COMMENTS, MANAGE } } = CONSTANTS;
import ProfileLists from './ProfileLists';
import ProfileManage from './ProfileManage';

const ProfileTabs = () => {
  return (
    <Tabs defaultTab={USER_MANGA_LISTS}>
      <Tab eventKey={USER_MANGA_LISTS} title={<TabLink to={USER_MANGA_LISTS}>Manga Lists</TabLink>}>
        <ProfileLists />
      </Tab>
      <Tab eventKey={COMMENTS} title={<TabLink to={COMMENTS}>Commets</TabLink>}>
      </Tab>
      <Tab eventKey={MANAGE} title={<TabLink to={MANAGE}>Manage</TabLink>}>
        <ProfileManage />
      </Tab>
    </Tabs>
  );
};

export default ProfileTabs;
