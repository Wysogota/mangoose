import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import styles from './Avatar.module.scss';
import CONSTANTS from '../../constants';

const Avatar = ({ avatar = CONSTANTS.DEFAULT_AVATAR }) => {
  const { theme: { mainColor } } = useSelector(({ themes }) => themes);
  const { isAuthorized } = useSelector(({ auth }) => auth);
  const { showSignIn } = bindActionCreators(actionCreators, useDispatch());
  const classes = cx(
    styles.avatar,
    styles[mainColor]
  );

  return (
    <Link to={isAuthorized ? '/profile' : '#'} onClick={!isAuthorized && showSignIn}>
      <Image
        src={CONSTANTS.STATIC_IMAGE_PATH + (isAuthorized ? avatar : CONSTANTS['NOT_REGISTERED_AVATAR_' + mainColor.toUpperCase()])}
        className={classes} fluid rounded
      />
    </Link>
  );
};

export default Avatar;
