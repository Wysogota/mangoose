import React from 'react';
import { Link } from 'react-router-dom';
import {
  BsFillHouseFill as HomeIcon, BsGithub as GithubIcon,
  BsGridFill as CatalogIcon, BsSearch as SearchIcon, BsFillQuestionCircleFill as FAQIcon,
  BsNewspaper as NewsIcon, BsFillEnvelopeFill as ContactsIcon, BsShuffle as RandomIcon
} from 'react-icons/bs';
import ToggleTheme from '../ToggleTheme';

import styles from './NavItems.module.scss';

const createComponent = (Component, to, Icon, title, external = false) => {
  return external ?
    <a href={to} target='_blank' rel='noreferrer' className='h-100 w-100 d-flex align-items-center'>
      <Icon /><span className={styles.ml}>{title}</span>
    </a> :
    <Component as={Link} to={to} className='h-100 w-100 d-flex align-items-center'>
      <Icon /><span className={styles.ml}>{title}</span>
    </Component>;
};

const Catalog = (Component) => createComponent(Component, '#', CatalogIcon, 'Catalog');
const Search = (Component) => createComponent(Component, '#', SearchIcon, 'Search');
const FAQ = (Component) => createComponent(Component, '#', FAQIcon, 'FAQ');
const News = (Component) => createComponent(Component, '#', NewsIcon, 'News');
const Contacts = (Component) => createComponent(Component, '#', ContactsIcon, 'Contacts');
const Random = (Component) => createComponent(Component, '#', RandomIcon, 'Random');
const Github = (Component) => createComponent(Component, 'https://github.com/Wysogota/mangoose', GithubIcon, 'Github', true);

const Theme = (Component, className, shouldInverted = true) =>
  <ToggleTheme
    Component={Component} shouldInverted={shouldInverted}
    btnClasses={'h-100 w-100 d-flex align-items-center ' + className}
  >
    <span className={styles.ml}>Toggle theme</span>
  </ToggleTheme>;

export default { Catalog, Search, FAQ, News, Contacts, Random, Theme, Github };
