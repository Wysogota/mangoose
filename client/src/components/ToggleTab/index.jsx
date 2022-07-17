import React, { forwardRef } from 'react';
import { useSelector } from 'react-redux';
import { Button, useAccordionButton } from 'react-bootstrap';

const ToggleTab = (props, ref) => {
  const { eventKey, selected, focused, children } = props;
  const { theme: { outlineColor, invertedColor } } = useSelector(({ themes }) => themes);
  const decoratedOnClick = useAccordionButton(eventKey);

  return (
    <Button
      ref={ref}
      onClick={decoratedOnClick}
      variant={(focused || selected) ? invertedColor : outlineColor}
      className='me-2 shadow-none'
    >
      {children}
    </Button>
  );
};

export default forwardRef(ToggleTab);