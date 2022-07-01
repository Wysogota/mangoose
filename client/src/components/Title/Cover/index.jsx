import React from 'react';
import { Image } from 'react-bootstrap';

import styles from './Cover.module.scss';

const Cover = (props) => {
  const { image, alt } = props;
  return (
    <div className='pb-3'>
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
