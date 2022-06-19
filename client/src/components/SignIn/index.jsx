import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Input from '../../components/Input';
import CloseButton from '../CloseButton';
import themes from '../../common/styles/theme.module.scss';
import { SIGN_IN_SCHEMA } from '../../utils/validationSchemas';

const initialValues = {
  email: '',
  password: '',
};

const SignIn = () => {
  const { theme: { mainColor, bgColor, invertedColor } } = useSelector(({ themes }) => themes);
  const { isSignInShown } = useSelector(({ signIn }) => signIn);
  const { hideSignIn } = bindActionCreators(actionCreators, useDispatch());

  const theme = [themes[mainColor], themes[bgColor]];
  const headerClasses = cx(
    ...theme,
    'text-uppercase'
  );

  const bodyClasses = cx(
    ...theme,
    'p-4'
  );

  const footerClasses = cx(
    ...theme,
    'justify-content-center'
  );

  const onSubmit = (values, formikBag) => {
    hideSignIn();
    formikBag.resetForm();
  };

  return (
    <Modal show={isSignInShown} onHide={hideSignIn}>
      <Modal.Header className={headerClasses}>
        <Modal.Title >sign in</Modal.Title>
        <CloseButton onClick={hideSignIn} />
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={SIGN_IN_SCHEMA}
      >
        <Form>
          <Modal.Body className={bodyClasses}>
            <Input name='email' label='Email address' placeholder='Enter email' type='email' />
            <Input name='password' label='Password' placeholder='Enter password' type='password' />
          </Modal.Body>
          <Modal.Footer className={footerClasses}>
            <Button className='text-capitalize' variant={invertedColor} type='submit'>sign in</Button>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>

  );
};

export default SignIn;
