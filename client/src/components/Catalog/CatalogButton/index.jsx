import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import cx from 'classnames';
import ColBlock from '../../Blocks/ColBlock';
import { Catalog } from '../../NavItems';
import styles from './CatalogButton.module.scss';

const CatalogButton = (props) => {
  const { onClick, title, params, bgTheme, stopAnimation } = props;
  const classes = cx(
    styles.button,
    'm-auto',
  );

  return (
    <motion.div
      initial={{ y: stopAnimation ? 0 : 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}
    >
      <ColBlock className={classes} innerClassName={bgTheme} >
        <Catalog Component={Link} options={{ className: 'justify-content-center fs-5', onClick, title, params }} />
      </ColBlock>
    </motion.div>

  );
};

export default CatalogButton;