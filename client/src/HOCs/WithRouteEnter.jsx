import React, { useEffect } from 'react';
import { getPageTitle } from '../common/functions';

const WithRouteEnter = (Component, options) => {
  const { name } = options;

  const Hoc = () => {
    useEffect(() => { document.title = getPageTitle(name); }, []);
    return <Component />;
  };

  return Hoc;
};

export default WithRouteEnter;
