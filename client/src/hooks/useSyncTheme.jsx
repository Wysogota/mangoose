import { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useDispatch } from 'react-redux';
import * as actionCreators from '../redux/actions/actionCreators';
import CONSTANTS from '../constants';
const { STORAGE: { THEME } } = CONSTANTS;

/**
 * Synchronizes current theme between pages through local storage
 */
const useSyncTheme = () => {
  const { setTheme } = bindActionCreators(actionCreators, useDispatch());

  useEffect(() => {
    const themeHandle = (event) => {
      if (event.key === THEME) {
        setTheme(event.newValue);
      }
    };

    window.addEventListener('storage', themeHandle);
  }, []);
};

export default useSyncTheme;
