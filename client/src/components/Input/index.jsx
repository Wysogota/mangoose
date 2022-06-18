import React from 'react';
import { ErrorMessage, Field } from 'formik';
import { Form } from 'react-bootstrap';
import styles from './Input.module.scss';

const Input = (props) => {
  const { label, name, ...other } = props;
  return (
    <Form.Group className='pb-2 position-relative'>
      <Form.Label className='mb-1'>{label}</Form.Label>
      <div className='position-relative'>
        <Form.Control as={Field} name={name} {...other} />
        <ErrorMessage className={styles.error} name={name} component='span' />
      </div>
    </Form.Group>
  );
};

export default Input;
