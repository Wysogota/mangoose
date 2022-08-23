import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { useParams } from 'react-router-dom';
import { capitalize } from 'lodash';
import { Formik, Form } from 'formik';
import { Button, ButtonGroup } from 'react-bootstrap';
import CONSTANTS from '../../../constants';
import { useLoading } from '../../../hooks';
import RecommendationCheck from './RecommendationCheck';
const { RECOMMENDATION_LIST } = CONSTANTS;

const SaveToRecommendation = () => {
  const { theme: { mainColor, bgInvertedHoveredTheme } } = useSelector(({ themes }) => themes);
  const { token } = useSelector(({ auth }) => auth);
  const { manga, isFetching } = useSelector(({ recommendationList }) => recommendationList);
  const { saveMangaToRecommendationList, getMangaFromRecommendationList } = bindActionCreators(actionCreators, useDispatch());
  const { mangaId } = useParams();

  useEffect(() => {
    getMangaFromRecommendationList({ mangaId, token });
  }, []);

  const onSubmit = (values, formikBag) => {
    const { display } = values;
    saveMangaToRecommendationList({ mangaId, display, token });
    formikBag.resetForm();
  };

  const loading = useLoading({ data: manga, isFetching });
  if (loading) return loading;

  return (
    <Formik initialValues={{ display: false }} onSubmit={onSubmit}>
      <Form className='d-flex'>
        <ButtonGroup>
          <RecommendationCheck name='display' initialValue={manga.display} />
          <Button type='submit' variant={mainColor} className={bgInvertedHoveredTheme}>
            {capitalize(RECOMMENDATION_LIST)}
          </Button>
        </ButtonGroup>
      </Form>
    </Formik>
  );
};

export default SaveToRecommendation;
