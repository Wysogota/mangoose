import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Button, Modal } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Input from '../../components/Input';
import CloseButton from '../CloseButton';
import { useAuthRedirect } from '../../hooks';
import { SIGN_IN_SCHEMA } from '../../utils/validationSchemas';
import CONSTANTS from '../../constants';
const { PAGES: {
  SIGN_UP: { path: SIGN_UP_PATH },
} } = CONSTANTS;

const redirectPaths = [
  SIGN_UP_PATH, 
];

const initialValues = {
  email: '',
  password: '',
};

const SignIn = () => {
  const { theme: { mainTheme, bgTheme, invertedColor } } = useSelector(({ themes }) => themes);
  const { isSignInShown } = useSelector(({ modalItems }) => modalItems);
  const { isFetching, errors } = useSelector(({ auth }) => auth);
  const { hideSignIn, signIn } = bindActionCreators(actionCreators, useDispatch());
  const [isRequested, setIsRequested] = useState(false);
  const authRedirect = useAuthRedirect();

  useEffect(() => {
    if (isRequested && !errors) {
      setIsRequested(false);
      hideSignIn();
      authRedirect(redirectPaths);
    }
  }, [isFetching]);

  const onSubmit = (values, formikBag) => {
    signIn(values);
    setIsRequested(true);
    formikBag.resetForm();
  };

  const contentClasses = cx(mainTheme, bgTheme);

  return (
    <Modal show={isSignInShown} backdrop='static' contentClassName={contentClasses}>
      <Modal.Header className='text-uppercase'>
        <Modal.Title>sign in</Modal.Title>
        <CloseButton onClick={hideSignIn} />
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={SIGN_IN_SCHEMA}
      >
        <Form>
          <Modal.Body className='p-4'>
            <Input
              name='email'
              label='Email address'
              placeholder='Enter email'
              type='email'
            />
            <Input
              name='password'
              label='Password'
              placeholder='Enter password'
              type='password'
            />
          </Modal.Body>
          <Modal.Footer className='justify-content-center flex-column'>
            <Button className='text-capitalize' variant={invertedColor} type='submit'>sign in</Button>
            <div>
              <span>Dont have account? </span>
              <Link to={SIGN_UP_PATH} onClick={hideSignIn} className={mainTheme}>Sign Up</Link>
            </div>
          </Modal.Footer>
        </Form>
      </Formik>
    </Modal>
  );
};

export default SignIn;
