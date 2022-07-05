import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import cx from 'classnames';
import styles from './ReadingButtonsBlock.module.scss';

const ReadingButtonsBlock = (props) => {
  const { isMobileView } = props;
  const { theme: { invertedColor, bgTheme } } = useSelector(({ themes }) => themes);

  const containerClasses = cx(
    bgTheme,
    isMobileView && styles.fixed_position,
    'pt-3'
  );

  const startReadingClasses = cx(
    'w-100 pt-2 pb-2 mb-3 text-uppercase',
    styles.start_reading,
  );

  return (
    <div className={containerClasses}>
      <Button
        variant={invertedColor}
        className={startReadingClasses}
      >
        Start reading
      </Button>
    </div>
  );
};

export default ReadingButtonsBlock;
