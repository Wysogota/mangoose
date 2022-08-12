import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import cx from 'classnames';
import Image from 'react-bootstrap/Image';
import styles from './Avatar.module.scss';
import CONSTANTS from '../../constants';
const { STATIC_IMAGE_PATH } = CONSTANTS;

const Avatar = (props) => {
  const { compact, className } = props;
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const { me: { avatar } } = useSelector(({ me }) => me);
  const { token } = useSelector(({ auth }) => auth);
  const { showSignIn } = bindActionCreators(actionCreators, useDispatch());

  const classes = cx(
    compact ? styles.compact_avatar : styles.avatar,
    compact ? 'rounded-2' : 'rounded',
    styles[invertedColor],
    className,
  );

  if (token) return (
    <Image src={avatar} className={classes} fluid />
  );
  else return (
    <Image
      onClick={showSignIn}
      src={STATIC_IMAGE_PATH + CONSTANTS['NOT_REGISTERED_AVATAR_' + invertedColor.toUpperCase()]}
      className={classes} fluid
    />
  );

};

export default Avatar;
