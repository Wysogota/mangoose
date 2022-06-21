import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import {
  BsFillHouseFill as HomeIcon, BsGithub as GithubIcon,
  BsGridFill as CatalogIcon, BsSearch as SearchIcon, BsFillQuestionCircleFill as FAQIcon,
  BsNewspaper as NewsIcon, BsFillEnvelopeFill as ContactsIcon, BsShuffle as RandomIcon
} from 'react-icons/bs';
import ToggleTheme from '../ToggleTheme';

import styles from './NavItems.module.scss';

const createComponent = (Component, to, Icon, title, options) => {
  const { theme: { hoveredTheme, invertedHoveredTheme } } = useSelector(({ themes }) => themes);
  const classes = cx(
    options?.inverted ? invertedHoveredTheme : hoveredTheme,
    'h-100 w-100 d-flex align-items-center'
  );

  const Child = () => (<><Icon /><span className={styles.ml}>{title}</span></>);
  return options?.external
    ? <a href={to} target='_blank' rel='noreferrer' className={classes}><Child /></a>
    : <Component as={Link} to={to} className={classes}><Child /></Component>;
};

const Catalog = (Component, options) => createComponent(Component, '#', CatalogIcon, 'Catalog', options);
const Search = (Component, options) => createComponent(Component, '#', SearchIcon, 'Search', options);
const FAQ = (Component, options) => createComponent(Component, '#', FAQIcon, 'FAQ', options);
const News = (Component, options) => createComponent(Component, '#', NewsIcon, 'News', options);
const Contacts = (Component, options) => createComponent(Component, '#', ContactsIcon, 'Contacts', options);
const Random = (Component, options) => createComponent(Component, '#', RandomIcon, 'Random', options);
const Github = (Component, options) => createComponent(Component, 'https://github.com/Wysogota/mangoose', GithubIcon, 'Github', { external: true, inverted: false });

const Theme = (Component, options) =>
  <ToggleTheme
    Component={Component} shouldInverted={options?.shouldInverted}
    btnClasses={'h-100 w-100 d-flex align-items-center ' + options?.className}
  >
    <span className={styles.ml}>Toggle theme</span>
  </ToggleTheme>;

export default { Catalog, Search, FAQ, News, Contacts, Random, Theme, Github };
