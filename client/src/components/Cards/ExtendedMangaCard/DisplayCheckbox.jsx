import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Form } from 'react-bootstrap';

const DisplayCheckbox = (props) => {
  const { id, display } = props;
  const { token } = useSelector(({ auth }) => auth);
  const { saveMangaToRecommendationList } = bindActionCreators(actionCreators, useDispatch());
  const [checked, setChecked] = useState(display);

  const onChangeHandle = () => {
    setChecked(current => !current);
    saveMangaToRecommendationList({ mangaId: id, display: !checked, token });
  };

  return (
    <Form.Check
      type='switch'
      label='Display'
      onChange={onChangeHandle}
      checked={checked}
    />
  );
};

export default DisplayCheckbox;
