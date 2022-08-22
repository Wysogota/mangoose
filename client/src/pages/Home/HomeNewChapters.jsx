import React from 'react';
import cx from 'classnames';
import ColBlock from '../../components/Blocks/ColBlock';
import HeaderLink from '../../components/Headers/HeaderLink';
import NewChaptersList from '../../components/Lists/NewChaptersList';

const HomeNewChapters = (props) => {
  const { extendedCatalog } = props;

  const classes = cx(
    'd-flex flex-column',
    extendedCatalog && 'h-100',
  );

  return (
    <ColBlock title='New chapters' innerClassName={classes}>
      <HeaderLink to='#'>New chapters</HeaderLink>
      <NewChaptersList />
    </ColBlock>
  );
};

export default HomeNewChapters;