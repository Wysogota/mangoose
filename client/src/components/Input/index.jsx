import React from 'react';
import { ErrorMessage, Field } from 'formik';
import { Form } from 'react-bootstrap';
import styles from './Input.module.scss';

const Input = (props) => {
  const { label, type, placeholder } = props;
  return (
    <Form.Group >
      <Form.Label>{label}</Form.Label>
      <div className='position-relative'>
        <Form.Control as={Field} name={type} type={type} placeholder={placeholder} />
        <ErrorMessage className={styles.error} name={type} component='span' />
      </div>
    </Form.Group>
  );
};

export default Input;
