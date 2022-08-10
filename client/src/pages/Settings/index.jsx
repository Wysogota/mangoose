import { ErrorMessage, Form, Formik } from 'formik';
import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Form as BsForm } from 'react-bootstrap';
import { UPLOAD_AVATAR_SCHEMA } from '../../utils/validationSchemas';

const initialValues = {
  avatar: null,
};

const Settings = () => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const { token } = useSelector(({ auth }) => auth);
  const { uploadAvatar } = bindActionCreators(actionCreators, useDispatch());
  const onSubmit = ({ avatar }, formikBag) => uploadAvatar(avatar, token);
  const onChange = (event, formik) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('avatar', file);
    formik.setFieldValue('avatar', formData);
  };

  return (
    <div>
      <div>Settings</div>
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
                <Button type='submit' variant={invertedColor}>Update avatar</Button>
              </ButtonGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Settings;
