import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useSignOut } from '../../hooks';

const SignOutItem = () => {
  const signOut = useSignOut();
  return (
    <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
  );
};

export default SignOutItem;
