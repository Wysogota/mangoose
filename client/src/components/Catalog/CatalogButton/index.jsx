import React from 'react';
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import cx from 'classnames';
import ColBlock from '../../Blocks/ColBlock';
import NavItems from '../../NavItems';
import styles from './CatalogButton.module.scss';
const { Catalog } = NavItems;

const CatalogButton = () => {
  const classes = cx(
    styles.button,
    'm-auto'
  );

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1, transition: { duration: 0.7 } }}
    >
      <ColBlock className={classes}>
        {Catalog(Link, { className: 'justify-content-center fs-5' })}
      </ColBlock>
    </motion.div>

  );
};

export default CatalogButton;