import React from 'react';
import { Col, Tab } from 'react-bootstrap';
import Tabs from '../../components/Tabs';
import Tags from '../../components/Title/Tags';
import Arts from '../../components/Title/Arts';
import Chapters from '../../components/Chapters';
import Related from '../../components/Title/Related';
import TitleInfoList from './TitleInfoList';
import TabLink from '../../components/Tabs/TabLink';
import CONSTANTS from '../../constants';
const { TITLE_TABS: { INFO, CHAPTERS, RELATED, COMMENTS } } = CONSTANTS;

const TitleTabs = (props) => {
  const { mangaId, desc, tags, relationships, titleInfoAttr } = props;

  return (
    <Tabs defaultTab={INFO}>
      <Tab eventKey={INFO} title={<TabLink to={INFO}>Information</TabLink>}>
        <Col>{desc}</Col>
        <br />
        <TitleInfoList attributes={titleInfoAttr} className='d-block d-lg-none' inline />
        <br />
        <Tags data={tags} />
        <br />
        <Arts mangaId={mangaId} />
      </Tab>
      <Tab eventKey={CHAPTERS} title={<TabLink to={CHAPTERS}>Chapters</TabLink>}>
        <Chapters mangaId={mangaId} />
      </Tab>
      <Tab eventKey={RELATED} title={<TabLink to={RELATED}>Related</TabLink>}>
        <Related relationships={relationships} />
      </Tab>
      <Tab eventKey={COMMENTS} title={<TabLink to={COMMENTS}>Commets</TabLink>} disabled>
      </Tab>
    </Tabs>
  );
};

export default TitleTabs;
