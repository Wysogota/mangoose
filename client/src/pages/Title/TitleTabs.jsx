import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { Col, Tab, Tabs } from 'react-bootstrap';
import Tags from '../../components/Title/Tags';
import Arts from '../../components/Title/Arts';
import Related from '../../components/Title/Related';
import TabLink from '../../components/Tabs/TabLink';
import CONSTANTS from '../../constants';
const { PARAM_NAME: { tab } } = CONSTANTS;

const TitleTabs = (props) => {
  const { mangaId, desc, tags, relationships } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);
  const { info, chapters, related, commets } = CONSTANTS.TITLE_TABS;
  const [searchParams] = useSearchParams();
  const [paramValue, setParamValue] = useState(searchParams.get('tab'));
  useEffect(() => setParamValue(searchParams.get('tab')), [searchParams]);

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
          <Tags data={tags} />
          <br />
          <Arts mangaId={mangaId} paramName={tab} tabParamValue={info}/>
        </Tab.Content>
      </Tab>
      <Tab eventKey={chapters} title={<TabLink to={chapters}>Chapters</TabLink>}>
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
