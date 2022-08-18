import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { motion } from 'framer-motion';
import { BsBookmarkXFill as RemoveIcon } from 'react-icons/bs';
import styles from './ExtendedMangaCard.module.scss';

const initial = { y: 0, opacity: 0 };

const RemoveFromRec = (props) => {
  const { id, hovered } = props;
  const { token } = useSelector(({ auth }) => auth);
  const { removeMangaFromRecommendationList } = bindActionCreators(actionCreators, useDispatch());
  const onClickHandle = () => { removeMangaFromRecommendationList({ mangaId: id, token }); };

  const whileInView = {
    y: hovered ? -10 : 0,
    opacity: hovered ? 1 : 0,
    transition: { duration: 0.2 }
  };

  return (
    <motion.div className={styles.remove_button} initial={initial} whileInView={whileInView}>
      <RemoveIcon onClick={onClickHandle} />
    </motion.div>
  );
};

export default RemoveFromRec;
