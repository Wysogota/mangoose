import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import StartReadingButton from './StartReadingButton';
import styles from './ReadingButtonsBlock.module.scss';


const ReadingButtonsBlock = (props) => {
  const { isAdaptiveView } = props;
  const { theme: { bgTheme } } = useSelector(({ themes }) => themes);

  const containerClasses = cx(
    bgTheme,
    isAdaptiveView && styles.fixed_position,
    'pt-3'
  );

  return (
    <div className={containerClasses}>
      <StartReadingButton />
    </div>
  );
};

export default ReadingButtonsBlock;
