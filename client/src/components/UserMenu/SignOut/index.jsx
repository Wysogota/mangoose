import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { useSignOut } from '../../../hooks';

const SignOut = (props) => {
  const { Component, onClick, className } = props;
  const signOut = useSignOut();

  const onClickHandle = () => {
    onClick && onClick();
    signOut();
  };
  return (
    <Component onClick={onClickHandle} className={className}>Sign Out</Component>
  );
};

SignOut.defaultProps = {
  Component: Dropdown.Item,
};

SignOut.propTypes = {
  Component: PropTypes.element,
  onClick: PropTypes.string,
  className: PropTypes.string,
};

export default SignOut;
