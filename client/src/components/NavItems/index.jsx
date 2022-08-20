import React from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../redux/actions/actionCreators';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import {
  BsGithub as GithubIcon, BsGridFill as CatalogIcon, BsFillQuestionCircleFill as FAQIcon,
  BsNewspaper as NewsIcon, BsFillEnvelopeFill as ContactsIcon, BsShuffle as RandomIcon
} from 'react-icons/bs';
import styles from './NavItems.module.scss';
import CONSTANTS from '../../constants';
const { PAGES: { CATALOG: { name: catalogName, path: catalogPath } } } = CONSTANTS;

const getComponentOptions = (title, to, options) => ({
  ...options,
  title: options.title || title,
  to,
});

const createComponent = (Component, Icon, options) => {
  const { title, to, className, onClick, params, invertedHovered, external } = options;
  const { theme: { hoveredTheme, bgInvertedHoveredTheme } } = useSelector(({ themes }) => themes);
  const { hideSearchbar } = bindActionCreators(actionCreators, useDispatch());

  const onClickHandle = () => {
    hideSearchbar();
    if (onClick) onClick();
  };

  const classes = cx(
    className,
    invertedHovered ? bgInvertedHoveredTheme : hoveredTheme,
    'h-100 w-100 d-flex align-items-center'
  );

  const Child = () => {
    const classes = cx(
      styles.text_overflow,
      'ms-2',
    );
    
    return (<><Icon /><span className={classes}>{title}</span></>);
  };

  return external ?
    (<a
      href={to} target='_blank' rel='noreferrer'
      className={classes}
      onClick={onClickHandle}
    >
      <Child />
    </a>) :
    (<Component
      as={Link}
      to={params ? `${to}?${params}` : to}
      className={classes}
      onClick={onClickHandle}
    >
      <Child />
    </Component>);
};


const Catalog = ({ Component, options = {} }) => {
  const assignedOptions = getComponentOptions(catalogName, catalogPath, options);
  return createComponent(Component, CatalogIcon, assignedOptions);
};

const FAQ = ({ Component, options = {} }) => {
  const assignedOptions = getComponentOptions('FAQ', '#', options);
  return createComponent(Component, FAQIcon, assignedOptions);
};

const News = ({ Component, options = {} }) => {
  const assignedOptions = getComponentOptions('News', '#', options);
  return createComponent(Component, NewsIcon, assignedOptions);
};

const Contacts = ({ Component, options = {} }) => {
  const assignedOptions = getComponentOptions('Contacts', '#', options);
  return createComponent(Component, ContactsIcon, assignedOptions);
};

const Random = ({ Component, options = {} }) => {
  const assignedOptions = getComponentOptions('Random', '#', options);
  return createComponent(Component, RandomIcon, assignedOptions);
};

const Github = ({ Component, options = {} }) => {
  const defaultOptions = {
    external: true,
    invertedHovered: false,
  };
  const assignedOptions = getComponentOptions('Github', 'https://github.com/Wysogota/mangoose', defaultOptions);
  return createComponent(Component, GithubIcon, assignedOptions);
};


export { default as Search } from './Search';
export { default as Theme } from './Theme';
export { Catalog, FAQ, News, Contacts, Random, Github };
