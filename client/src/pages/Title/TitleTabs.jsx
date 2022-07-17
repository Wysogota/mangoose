import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Col, Tab, Tabs } from 'react-bootstrap';
import Tags from '../../components/Title/Tags';
import Arts from '../../components/Title/Arts';
import Chapters from '../../components/Chapters';
import Related from '../../components/Title/Related';
import TabLink from '../../components/Tabs/TabLink';
import TitleInfoList from './TitleInfoList';
import CONSTANTS from '../../constants';
const {
  PARAM_NAME: { TAB },
  TITLE_TABS: { INFO, CHAPTERS, RELATED, COMMENTS }
} = CONSTANTS;

const TitleTabs = (props) => {
  const { mangaId, desc, tags, relationships, titleInfoAttr } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);
  const [searchParams] = useSearchParams();
  const [paramValue, setParamValue] = useState(searchParams.get(TAB));
  useEffect(() => setParamValue(searchParams.get(TAB)), [searchParams]);

  return (
    <Tabs
      justify
      activeKey={paramValue || INFO}
      onSelect={(key) => setParamValue(key)}
      className={`nav-tabs-${mainColor}`}
      data-link-tab='link-tab'
      mountOnEnter
    >
      <Tab eventKey={INFO} title={<TabLink to={INFO}>Information</TabLink>}>
        <Tab.Content>
          <Col>{desc}</Col>
          <br />
          <TitleInfoList attributes={titleInfoAttr} className='d-block d-lg-none' inline />
          <br />
          <Tags data={tags} />
          <br />
          <Arts mangaId={mangaId} />
        </Tab.Content>
      </Tab>
      <Tab eventKey={CHAPTERS} title={<TabLink to={CHAPTERS}>Chapters</TabLink>}>
        <Chapters mangaId={mangaId} />
      </Tab>
      <Tab eventKey={RELATED} title={<TabLink to={RELATED}>Related</TabLink>}>
        <Tab.Content>
          <Related relationships={relationships} />
        </Tab.Content>
      </Tab>
      <Tab eventKey={COMMENTS} title={<TabLink to={COMMENTS}>Commets</TabLink>} disabled>
      </Tab>
    </Tabs>
  );
};

export default TitleTabs;
