import React from 'react';
import { Image } from 'react-bootstrap';
import cx from 'classnames';
import styles from './Cover.module.scss';

const Cover = (props) => {
  const { image, alt, className } = props;
  const containerClasses = cx(
    className,
    'pb-3'
  );

  return (
    <div className={containerClasses}>
      <Image
        src={image}
        alt={alt}
        className={styles.image}
        fluid rounded
      />
    </div>
  );
};

export default Cover;
