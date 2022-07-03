import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import Tags from '../../components/Title/Tags';
import Arts from '../../components/Title/Arts';
import Related from '../../components/Title/Related';

const TitleTabs = (props) => {
  const { mangaId, desc, tags, relationships } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);

  return (
    <Tabs justify defaultActiveKey='info' className={`nav-tabs-${mainColor}`} mountOnEnter>
      <Tab eventKey='info' title='Information'>
        <Tab.Content>
          <Col>{desc}</Col>
          <br />
          <Tags data={tags} />
          <br />
          <Arts mangaId={mangaId} />
        </Tab.Content>
      </Tab>
      <Tab eventKey='chapters' title='Chapters'>
      </Tab>
      <Tab eventKey='related' title='Related'>
        <Related relationships={relationships} />
      </Tab>
      <Tab eventKey='commets' title='Commets' disabled>
      </Tab>
    </Tabs>
  );
};

export default TitleTabs;
