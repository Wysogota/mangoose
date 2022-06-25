import React from 'react';
import { useSelector } from 'react-redux';
import { Button, useAccordionButton } from 'react-bootstrap';

const ToggleTab = ({ eventKey, children }) => {
  const { theme: { outlineColor } } = useSelector(({ themes }) => themes);
  const decoratedOnClick = useAccordionButton(eventKey);
  return (
    <Button onClick={decoratedOnClick} variant={outlineColor} className='me-2' >
      {children}
    </Button>
  );
};

export default ToggleTab;