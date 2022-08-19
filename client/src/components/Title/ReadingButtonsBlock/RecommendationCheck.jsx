import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { Field, useField } from 'formik';
import { FormCheck } from 'react-bootstrap';
import styles from './ReadingButtonsBlock.module.scss';

const RecommendationCheck = (props) => {
  const { name, initialValue } = props;
  const { theme: { bgInvertedHoveredTheme } } = useSelector(({ themes }) => themes);
  const [, { value }, { setValue }] = useField(name);

  useEffect(() => { setValue(initialValue || false); }, []);

  const onClickHandle = () => setValue(!value);

  const checkboxContainerClasses = cx(
    bgInvertedHoveredTheme,
    'd-flex flex-column align-items-center p-1'
  );

  return (
    <div
      className={checkboxContainerClasses}
      onClick={onClickHandle}
    >
      <FormCheck.Input as={Field} name={name} className='m-0' />
      <FormCheck.Label className={styles.rec_label}>Display</FormCheck.Label >
    </div>
  );
};

export default RecommendationCheck;
