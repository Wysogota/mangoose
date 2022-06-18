import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { Col, Container, Row, Button } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import Header from '../../components/Header';
import Input from '../../components/Input';
import styles from './SignUp.module.scss';
import themes from '../../common/styles/theme.module.scss';
import { SIGN_UP_SCHEMA } from '../../utils/validationSchemas';


const initialValues = {
  nickname: '',
  email: '',
  password: '',
  passwordConfirm: '',
};

const SignUp = () => {
  const { isDarkTheme, theme } = useSelector(({ themes }) => themes);

  const containerClasses = cx(
    styles.container,
    isDarkTheme ? themes.dark : themes.light,
  );

  const blockClasses = cx(
    isDarkTheme ? themes.dark_bg : themes.light_bg,
    "p-5 rounded"
  );

  const onSubmit = (values, formikBag) => {
    formikBag.resetForm();
  };

  return (
    <>
      <Header />
      <Container className={containerClasses}>
        <Row className='mt-5 justify-content-center'>
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
                  <Button className='text-capitalize' variant={theme} type='submit'>sign up</Button>
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
