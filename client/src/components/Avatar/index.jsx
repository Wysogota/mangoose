import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import Image from 'react-bootstrap/Image';
import styles from './Avatar.module.scss';
import CONSTANTS from '../../constants';
const { STATIC_IMAGE_PATH, DEFAULT_AVATAR } = CONSTANTS;

const Avatar = (props) => {
  const { avatar = DEFAULT_AVATAR } = props;
  const { theme: { invertedColor, } } = useSelector(({ themes }) => themes);
  const { isAuthorized } = useSelector(({ auth }) => auth);
  const { showSignIn } = bindActionCreators(actionCreators, useDispatch());

  const classes = cx(
    styles.avatar,
    styles[invertedColor],
    'rounded-2',
  );

  if (isAuthorized) {
    return (
      <Image
        src={STATIC_IMAGE_PATH + avatar}
        className={classes} fluid
      />
    );
  } else {
    return (
      <Image
        onClick={showSignIn}
        src={STATIC_IMAGE_PATH + CONSTANTS['NOT_REGISTERED_AVATAR_' + invertedColor.toUpperCase()]}
        className={classes} fluid
      />
    );
  }

};

export default Avatar;
