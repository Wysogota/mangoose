import { ErrorMessage, Form, Formik } from 'formik';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Form as BsForm } from 'react-bootstrap';
import { UPLOAD_AVATAR_SCHEMA } from '../../utils/validationSchemas';
import ModalAvatarEditor from '../../components/Avatar/ModalAvatarEditor';

const initialValues = {
  avatar: null,
};

const Settings = () => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const [avatar, setAvatar] = useState();
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);

  const onSubmit = ({ avatar }, formikBag) => {
    setAvatar(avatar);
    setShowAvatarEditor(true);
  };
  const onChange = (event, formik) => {
    const file = event.target.files[0];
    formik.setFieldValue('avatar', file);
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
                <Button type='submit' variant={invertedColor}>Edit avatar</Button>
              </ButtonGroup>
            </Form>
          );
        }}
      </Formik>
      <ModalAvatarEditor show={showAvatarEditor} setShow={setShowAvatarEditor} avatar={avatar} />
    </div>
  );
};

export default Settings;
