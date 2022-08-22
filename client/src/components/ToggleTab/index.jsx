import React, { forwardRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
  useEffect(() => { focused && setClicked(false); }, [focused]);

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

const refToggleTab = forwardRef(ToggleTab);

refToggleTab.propTypes = {
  eventKey: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  selected: PropTypes.bool.isRequired,
  focused: PropTypes.bool.isRequired,
  children: PropTypes.any,
};

export default refToggleTab;