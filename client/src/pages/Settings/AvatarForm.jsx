import React from 'react';
import { useSelector } from 'react-redux';
import { ErrorMessage, Form, Formik } from 'formik';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Form as BsForm } from 'react-bootstrap';
import cx from 'classnames';
import MinorHeader from '../../components/Headers/MinorHeader';
import { UPLOAD_AVATAR_SCHEMA } from '../../utils/validationSchemas';
import styles from './Settings.module.scss';

const initialValues = {
  avatar: null,
};

const AvatarForm = (props) => {
  const { setAvatar, setShowEditor, className } = props;
  const { theme: { mainColor, invertedColor } } = useSelector(({ themes }) => themes);

  const onSubmit = ({ avatar }, formikBag) => {
    setAvatar(avatar);
    setShowEditor(true);
  };
  const onChange = (event, formik) => {
    const file = event.target.files[0];
    formik.setFieldValue('avatar', file);
  };

  const inputClasses = cx(
    styles.input,
    styles['input_avatar_' + mainColor],
  );

  return (
    <article>
      <MinorHeader>Avatar</MinorHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={UPLOAD_AVATAR_SCHEMA}
        onSubmit={onSubmit}
      >
        {(formik) => {
          return (
            <Form encType='multipart/form-data' className={className}>
              <ButtonGroup className='w-100'>
                <div className='flex-grow-1 position-relative'>
                  <BsForm.Control
                    name='avatar'
                    type='file'
                    onChange={(event) => onChange(event, formik)}
                    className={inputClasses}
                  />
                  <ErrorMessage name='avatar' component='span' className={styles.error} />
                </div>
                <Button type='submit' variant={invertedColor} className={styles.submit}>Edit</Button>
              </ButtonGroup>
            </Form>
          );
        }}
      </Formik>
    </article>
  );
};

export default AvatarForm;
