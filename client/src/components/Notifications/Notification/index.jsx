import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Toast } from 'react-bootstrap';

const Notification = (props) => {
  const { title, body } = props;
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);
  const [show, setShow] = useState(true);

  return (
    <Toast
      bg={mainColor}
      show={show} onClose={() => setShow(false)}
      delay={2000} autohide
    >
      <Toast.Header>
        <strong className='me-auto'>{title}</strong>
      </Toast.Header>
      <Toast.Body>{body}</Toast.Body>
    </Toast>
  );
};

export default Notification;
