import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Tabs as BsTabs } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import CONSTANTS from '../../constants';
const { PARAM_NAME: { TAB } } = CONSTANTS;

const Tabs = (props) => {
  const { defaultTab, children } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);
  const [searchParams] = useSearchParams();
  const [paramValue, setParamValue] = useState(searchParams.get(TAB));
  useEffect(() => setParamValue(searchParams.get(TAB)), [searchParams]);

  return (
    <BsTabs
      justify
      activeKey={paramValue || defaultTab}
      className={`nav-tabs-${mainColor}`}
      data-link-tab='link-tab'
      mountOnEnter
    >
      {children}
    </BsTabs>
  );
};

Tabs.propTypes = {
  defaultTab: PropTypes.string.isRequired,
  children: PropTypes.any,
};

export default Tabs;
