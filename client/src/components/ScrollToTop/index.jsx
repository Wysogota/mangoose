import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import { motion } from 'framer-motion';
import { BsChevronDoubleUp as UpIcon } from 'react-icons/bs';
import styles from './ScrollToTop.module.scss';

const ScrollToTop = (props) => {
  const { showHeight } = props;
  const { theme: { mainColor, mainTheme, bgTheme, bgInvertedHoveredTheme } } = useSelector(({ themes }) => themes);
  const [visible, setVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const toggleVisible = () => {
      const scrolled = document.documentElement.scrollTop;
      setVisible(scrolled > showHeight);
    };

    window.addEventListener('scroll', toggleVisible);
    return () => window.removeEventListener('scroll', toggleVisible);
  }, []);


  const classes = cx(
    styles.button,
    mainTheme,
    bgTheme,
    bgInvertedHoveredTheme,
    styles[mainColor],
  );

  const visibleAnimation = { y: 0, opacity: 1, transition: { duration: 0.5 } };
  const invisibleAnimation = { y: 100, opacity: 0 };

  return (
    <motion.div
      initial={invisibleAnimation}
      whileInView={visible ? visibleAnimation : invisibleAnimation}
      className={styles.position}
    >
      <button className={classes} onClick={scrollToTop} >
        <UpIcon />
      </button>
    </motion.div>
  );
};

ScrollToTop.defaultProps = {
  showHeight: 200,
};

ScrollToTop.propsTypes = {
  showHeight: PropTypes.number,
};

export default ScrollToTop;
