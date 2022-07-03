import React from 'react';
import { useSelector } from 'react-redux';
import { Col } from 'react-bootstrap';
import MainHeader from '../../Headers/MainHeader';
import TagButtons from '../TagButtons';
import cx from 'classnames';

const Tags = (props) => {
  const { data } = props;
  const { theme: { bgAccentTheme } } = useSelector(({ themes }) => themes);

  const containerClasses = cx(
    bgAccentTheme,
    'rounded p-3',
  );

  return (
    <Col>
      <Col className={containerClasses} xs='8'>
        <MainHeader>Tags</MainHeader>
        <div className='d-flex flex-wrap'><TagButtons tags={data} /></div>
      </Col>
      <Col></Col>
    </Col>
  );
};

export default Tags;
