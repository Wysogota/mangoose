import React from 'react';
import { useSelector } from 'react-redux';
import Notification from '../Notification';

const AuthNotification = () => {
  const { message, errors } = useSelector(({ auth }) => auth);

  if (message) return (
    <Notification
      title='Authorization'
      body={message}
    />
  );

  if (errors) return (
    errors.map(({ message }, i) =>
      <Notification
        key={i}
        title='Authorization Error'
        body={message}
      />
    )
  );

  return null;
};

export default AuthNotification;
