import React from 'react';
import { ToastContainer } from 'react-bootstrap';
import AuthNotification from './AuthNotification';
import styles from './Notifications.module.scss';
import cx from 'classnames';

const Notifications = () => {

  const classes = cx(
    styles.container,
    'm-3',
  );

  return (
    <ToastContainer position='top-center' className={classes}>
      <AuthNotification />
    </ToastContainer>
  );
};

export default Notifications;
