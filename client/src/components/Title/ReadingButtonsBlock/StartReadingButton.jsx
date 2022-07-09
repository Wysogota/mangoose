import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import { Link, useParams } from 'react-router-dom';
import cx from 'classnames';
import { Button } from 'react-bootstrap';
import styles from './ReadingButtonsBlock.module.scss';
import CONSTANTS from '../../../constants';
const { DEFAULT_LOCALE } = CONSTANTS;

const StartReadingButton = () => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const { firstChapterId, isFetching } = useSelector(({ firstChapterId }) => firstChapterId);
  const { getFirstChapterId } = bindActionCreators(actionCreators, useDispatch());
  const { mangaId } = useParams();

  useEffect(() => getFirstChapterId({ mangaId, lang: DEFAULT_LOCALE }), [mangaId]);

  const startReadingClasses = cx(
    'd-block w-100 pt-2 pb-2 text-uppercase',
    styles.start_reading,
  );

  return (
    <Button variant={invertedColor} className='w-100 mb-3 p-0'>
      {isFetching
        ? <div className={startReadingClasses}>Loading...</div>
        : <Link to={`/chapter/${firstChapterId}`} className={startReadingClasses}>Start reading</Link>}
    </Button>
  );
};

export default StartReadingButton;
