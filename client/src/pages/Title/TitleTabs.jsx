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
  PARAM_NAME: { tab },
  TITLE_TABS: { info, chapters, related, commets }
} = CONSTANTS;

const TitleTabs = (props) => {
  const { mangaId, desc, tags, relationships, titleInfoAttr } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);
  const [searchParams] = useSearchParams();
  const [paramValue, setParamValue] = useState(searchParams.get(tab));
  useEffect(() => setParamValue(searchParams.get(tab)), [searchParams]);

  return (
    <Tabs
      justify
      activeKey={paramValue || info}
      onSelect={(key) => setParamValue(key)}
      className={`nav-tabs-${mainColor}`}
      data-link-tab='link-tab'
      mountOnEnter
    >
      <Tab eventKey={info} title={<TabLink to={info}>Information</TabLink>}>
        <Tab.Content>
          <Col>{desc}</Col>
          <br />
          <TitleInfoList attributes={titleInfoAttr} className='d-block d-lg-none' inline/>
          <br />
          <Tags data={tags} />
          <br />
          <Arts mangaId={mangaId} paramName={tab} tabParamValue={info} />
        </Tab.Content>
      </Tab>
      <Tab eventKey={chapters} title={<TabLink to={chapters}>Chapters</TabLink>}>
        <Chapters mangaId={mangaId} paramName={tab} tabParamValue={chapters}/>
      </Tab>
      <Tab eventKey={related} title={<TabLink to={related}>Related</TabLink>}>
        <Tab.Content>
          <Related relationships={relationships} />
        </Tab.Content>
      </Tab>
      <Tab eventKey={commets} title={<TabLink to={commets}>Commets</TabLink>} disabled>
      </Tab>
    </Tabs>
  );
};

export default TitleTabs;
