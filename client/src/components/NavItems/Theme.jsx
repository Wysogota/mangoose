import React from 'react';
import cx from 'classnames';
import ToggleTheme from '../ToggleTheme';

const Theme = ({ Component, options }) => {
  const btnClasses = cx(
    options?.className,
    'h-100 w-100 d-flex align-items-center',
  );
  
  return (
    <ToggleTheme
      Component={Component}
      shouldInverted={options?.shouldInverted}
      btnClasses={btnClasses}
    >
      <span className='ms-2'>Toggle theme</span>
    </ToggleTheme >
  );
};

export default Theme;