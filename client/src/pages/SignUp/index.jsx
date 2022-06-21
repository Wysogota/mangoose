import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Header from '../../components/Header';
import Input from '../../components/Input';
import { SIGN_UP_SCHEMA } from '../../utils/validationSchemas';

const initialValues = {
  nickname: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignUp = () => {
  const { theme: { mainTheme, bgTheme, invertedColor } } = useSelector(({ themes }) => themes);

  const onSubmit = (values, formikBag) => {
    formikBag.resetForm();
  };

  const blockClasses = cx(
    bgTheme,
    'p-5 rounded'
  );

  return (
    <>
      <Header />
      <Container className={mainTheme}>
        <Row className=' mt-5 justify-content-center'>
          <Col md='8' lg='6' xl='5' className={blockClasses}>
            <h2 className='text-center text-uppercase pb-4'>sign up</h2>
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              validationSchema={SIGN_UP_SCHEMA}
            >
              <Form>
                <Input name='nickname' label='Nickname' placeholder='Enter nickname' />
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
    </>
  );
};

export default SignUp;
