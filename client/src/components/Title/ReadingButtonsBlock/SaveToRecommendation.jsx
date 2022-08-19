import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { useParams } from 'react-router-dom';
import cx from 'classnames';
import { capitalize } from 'lodash';
import { Field, Form, Formik } from 'formik';
import { Button, ButtonGroup, FormCheck } from 'react-bootstrap';
import styles from './ReadingButtonsBlock.module.scss';
import CONSTANTS from '../../../constants';
const { RECOMMENDATION_LIST } = CONSTANTS;

const SaveToRecommendation = () => {
  const { theme: { mainColor, bgInvertedHoveredTheme } } = useSelector(({ themes }) => themes);
  const { token } = useSelector(({ auth }) => auth);
  const { saveMangaToRecommendationList } = bindActionCreators(actionCreators, useDispatch());
  const { mangaId } = useParams();

  const onSubmit = (values, formikBag) => {
    const { display } = values;
    saveMangaToRecommendationList({ mangaId, display, token });
    formikBag.resetForm();
  };
  const checkboxContainerClasses = cx(
    bgInvertedHoveredTheme,
    'd-flex flex-column align-items-center p-1'
  );

  return (
    <Formik initialValues={{ display: false }} onSubmit={onSubmit}>
      {({ setFieldValue, values: { display } }) => (
        <Form className='d-flex'>
          <ButtonGroup>
            <div
              className={checkboxContainerClasses}
              onClick={() => setFieldValue('display', !display)}
            >
              <FormCheck.Input as={Field} name='display' className='m-0' />
              <FormCheck.Label className={styles.rec_label}>Display</FormCheck.Label >
            </div>
            <Button type='submit' variant={mainColor} className={bgInvertedHoveredTheme}>
              {capitalize(RECOMMENDATION_LIST)}
            </Button>
          </ButtonGroup>
        </Form>
      )}
    </Formik>
  );
};

export default SaveToRecommendation;
