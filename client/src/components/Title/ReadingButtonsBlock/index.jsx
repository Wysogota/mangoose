import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import StartReadingButton from './StartReadingButton';
import styles from './ReadingButtonsBlock.module.scss';
import SaveToList from './SaveToList';

const ReadingButtonsBlock = (props) => {
  const { isAdaptiveView } = props;
  const { theme: { bgTheme } } = useSelector(({ themes }) => themes);
  const { isAuthorized } = useSelector(({ auth }) => auth);

  const containerClasses = cx(
    bgTheme,
    isAdaptiveView && styles.fixed_position,
    isAdaptiveView && 'pt-3 ps-4 pe-4'
  );

  return (
    <div className={containerClasses}>
      <StartReadingButton />
      {isAuthorized && <SaveToList />}
    </div>
  );
};

export default ReadingButtonsBlock;
