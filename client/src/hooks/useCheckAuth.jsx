import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import * as actionCreators from '../redux/actions/actionCreators';
import { isEmpty } from 'lodash';

const useCheckAuth = () => {
  const { me } = useSelector(({ me }) => me);
  const { getMe, setAuthorized } = bindActionCreators(actionCreators, useDispatch());
  useEffect(() => getMe(), []);
  useEffect(() => !isEmpty(me) && setAuthorized(), [me]);
};

export default useCheckAuth;
