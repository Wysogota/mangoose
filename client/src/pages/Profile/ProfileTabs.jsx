import React from 'react';
import { Tab } from 'react-bootstrap';
import Tabs from '../../components/Tabs';
import TabLink from '../../components/Tabs/TabLink';
import CONSTANTS from '../../constants';
const { TITLE_TABS: { USER_MANGA_LISTS, COMMENTS } } = CONSTANTS;
import ProfileLists from './ProfileLists';

const ProfileTabs = () => {
  return (
    <Tabs defaultTab={USER_MANGA_LISTS}>
      <Tab eventKey={USER_MANGA_LISTS} title={<TabLink to={USER_MANGA_LISTS}>Manga Lists</TabLink>}>
        <ProfileLists />
      </Tab>
      <Tab eventKey={COMMENTS} title={<TabLink to={COMMENTS}>Commets</TabLink>}>
      </Tab>
    </Tabs>
  );
};

export default ProfileTabs;
