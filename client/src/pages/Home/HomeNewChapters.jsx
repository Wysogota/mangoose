import React from 'react';
import cx from 'classnames';
import ColBlock from '../../components/Blocks/ColBlock';
import HeaderLink from '../../components/HeaderLink';
import NewChaptersList from '../../components/Lists/NewChaptersList';
import { useAdaptiveView } from '../../hooks';
import CONSTANTS from '../../constants';
const {
  breakpoints: { lg },
} = CONSTANTS;

const HomeNewChapters = (props) => {
  const { extendedCatalog } = props;
  const isAdaptiveView = useAdaptiveView(lg);

  const classes = cx(
    'd-flex flex-column',
    extendedCatalog && 'h-100',
  );

  return (
    <ColBlock title='New chapters' innerClassName={classes}>
      <HeaderLink to='#' title='New chapters' />
      <NewChaptersList isAdaptiveView={isAdaptiveView}/>
    </ColBlock>
  );
};

export default HomeNewChapters;