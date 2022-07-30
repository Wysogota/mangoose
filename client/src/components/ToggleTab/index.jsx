import React, { forwardRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { Button, useAccordionButton } from 'react-bootstrap';
import styles from './ToggleTab.module.scss';

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

  const classes = cx(
    styles.tab,
    'me-2'
  );

  return (
    <Button
      ref={ref}
      onClick={onClickHandle}
      variant={(focused && clicked) || selected ? invertedColor : outlineColor}
      className={classes}
    >
      {children}
    </Button>
  );
};

export default forwardRef(ToggleTab);