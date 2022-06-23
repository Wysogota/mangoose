import React from 'react';
import ColBlock from '../ColBlock';
import HeaderLink from '../../HeaderLink';

const InfoBlock = (props) => {
  const { title, className, children } = props;

  return (
    <ColBlock className={className}>
      <HeaderLink to='/news' title={title} />
      {children}
    </ColBlock>
  );
};

export default InfoBlock;
