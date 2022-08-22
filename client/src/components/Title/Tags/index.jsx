import React from 'react';
import PropTypes from 'prop-types';
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
    <Col className={containerClasses}>
      <MainHeader>Tags</MainHeader>
      <TagButtons tags={data} />
    </Col>
  );
};

Tags.propsTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Tags;
