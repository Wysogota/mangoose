import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Input from '../../components/Input';
import { SIGN_UP_SCHEMA } from '../../utils/validationSchemas';
import { useAuthRedirect } from '../../hooks';

const initialValues = {
  username: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignUp = () => {
  const { theme: { mainTheme, bgTheme, invertedColor } } = useSelector(({ themes }) => themes);
  const { isFetching, errors } = useSelector(({ auth }) => auth);
  const { signUp } = bindActionCreators(actionCreators, useDispatch());
  const [isRequested, setIsRequested] = useState(false);
  const authRedirect = useAuthRedirect();
  const onSubmit = (values, formikBag) => {
    signUp(values);
    setIsRequested(true);
  };

  useEffect(() => {
    if (isRequested && !isFetching && !errors) {
      setIsRequested(false);
      authRedirect();
    }
  }, [isFetching]);

  const blockClasses = cx(
    bgTheme,
    'p-5 rounded'
  );

  return (
    <Container className={mainTheme}>
      <Row className='mt-5 mb-5 justify-content-center'>
        <Col md='8' lg='6' xl='5' className={blockClasses}>
          <h2 className='text-center text-uppercase pb-4'>sign up</h2>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={SIGN_UP_SCHEMA}
          >
            <Form>
              <Input name='username' label='Username' placeholder='Enter username' />
              <Input name='email' label='Email address' placeholder='Enter email' type='email' />
              <Input name='password' label='Password' placeholder='Enter password' type='password' />
              <Input name='passwordConfirm' label='Password confirmation' placeholder='Password confirmation' type='password' />
              <div className='text-center pt-3'>
                <Button className='text-capitalize' variant={invertedColor} type='submit'>sign up</Button>
              </div>
            </Form>
          </Formik>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
