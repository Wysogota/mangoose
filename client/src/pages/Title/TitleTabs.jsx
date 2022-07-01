import React from 'react';
import { useSelector } from 'react-redux';
import { Tab, Tabs } from 'react-bootstrap';
import Tags from '../../components/Title/Tags';

const TitleTabs = (props) => {
  const { desc, tags } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);

  return (
    <Tabs justify defaultActiveKey='info' className={`nav-tabs-${mainColor}`}>
      <Tab eventKey='info' title='Information'>
        <Tab.Content>
          <div >{desc}</div>
          <br />
          <Tags data={tags} />
        </Tab.Content>
      </Tab>
      <Tab eventKey='chapters' title='Chapters'>
      </Tab>
      <Tab eventKey='related' title='Related'>
      </Tab>
      <Tab eventKey='commets' title='Commets' disabled>
      </Tab>
    </Tabs>
  );
};

export default TitleTabs;
