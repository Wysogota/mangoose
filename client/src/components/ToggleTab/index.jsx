import React, { forwardRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, useAccordionButton } from 'react-bootstrap';

const ToggleTab = (props, ref) => {
  const { eventKey, selected, focused, children } = props;
  const { theme: { outlineColor, invertedColor } } = useSelector(({ themes }) => themes);
  const decoratedOnClick = useAccordionButton(eventKey);
  const [clicked, setClicked] = useState(false);

  const onClickHandle = () => {
    decoratedOnClick();
    setClicked(current => !current);
  };
  useEffect(() => focused && setClicked(false), [focused]);

  return (
    <Button
      ref={ref}
      onClick={onClickHandle}
      variant={(focused && clicked) || selected ? invertedColor : outlineColor}
      className='me-2 shadow-none'
    >
      {children}
    </Button>
  );
};

export default forwardRef(ToggleTab);