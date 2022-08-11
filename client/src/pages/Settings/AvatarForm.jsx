import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { ErrorMessage, Form, Formik } from 'formik';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Form as BsForm } from 'react-bootstrap';
import { UPLOAD_AVATAR_SCHEMA } from '../../utils/validationSchemas';

const initialValues = {
  avatar: null,
};

const AvatarForm = (props) => {
  const {setAvatar, setShowEditor} = props;
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);

  const onSubmit = ({ avatar }, formikBag) => {
    setAvatar(avatar);
    setShowEditor(true);
  };
  const onChange = (event, formik) => {
    const file = event.target.files[0];
    formik.setFieldValue('avatar', file);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={UPLOAD_AVATAR_SCHEMA}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form encType='multipart/form-data'>
            <BsForm.Label className='mb-1'>Avatar</BsForm.Label>
            <ButtonGroup className='w-100'>
              <BsForm.Control
                name='avatar'
                type='file'
                onChange={(event) => onChange(event, formik)}
                className='w-auto d-inline-block rounded-0'
              />
              <ErrorMessage name='avatar' />
              <Button type='submit' variant={invertedColor}>Edit avatar</Button>
            </ButtonGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AvatarForm;
