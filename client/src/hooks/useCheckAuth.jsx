import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../redux/actions/actionCreators';

const useCheckAuth = () => {
  const { getMe } = bindActionCreators(actionCreators, useDispatch());
  useEffect(() => getMe(), []);
};

export default useCheckAuth;
