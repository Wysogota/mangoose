import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, useAccordionButton } from 'react-bootstrap';

const ToggleTab = ({ eventKey, children }) => {
  const { theme: { outlineColor, invertedColor } } = useSelector(({ themes }) => themes);
  const [focused, setFocused] = useState(false);
  const ref = useRef(null);
  const decoratedOnClick = useAccordionButton(eventKey);

  useEffect(() => {
    document.activeElement === ref.current ? setFocused(true) : setFocused(false);
  }, [document.activeElement]);

  return (
    <Button
      ref={ref}
      onClick={decoratedOnClick}
      variant={focused ? invertedColor : outlineColor}
      className='me-2 shadow-none'
    >
      {children}
    </Button>
  );
};

export default ToggleTab;