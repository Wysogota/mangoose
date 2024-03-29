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
  const { desc, tags, relationships, titleInfoAttr } = props;

  return (
    <Tabs defaultTab={INFO.type}>
      <Tab eventKey={INFO.type} title={<TabLink to={INFO.type}>{INFO.title}</TabLink>}>
        <Col>{desc}</Col>
        <br />
        <TitleInfoList attributes={titleInfoAttr} className='d-block d-lg-none' inline />
        <br />
        <Tags data={tags} />
        <br />
        <Arts />
      </Tab>
      <Tab eventKey={CHAPTERS.type} title={<TabLink to={CHAPTERS.type}>{CHAPTERS.title}</TabLink>}>
        <Chapters />
      </Tab>
      <Tab eventKey={RELATED.type} title={<TabLink to={RELATED.type}>{RELATED.title}</TabLink>}>
        <Related relationships={relationships} />
      </Tab>
      <Tab eventKey={COMMENTS.type} title={<TabLink to={COMMENTS.type}>{COMMENTS.title}</TabLink>} disabled>
      </Tab>
    </Tabs>
  );
};

export default TitleTabs;
