import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import {
  BsGithub as GithubIcon, BsGridFill as CatalogIcon, BsFillQuestionCircleFill as FAQIcon,
  BsNewspaper as NewsIcon, BsFillEnvelopeFill as ContactsIcon, BsShuffle as RandomIcon
} from 'react-icons/bs';
import CONSTANTS from '../../constants';
const { PAGES: { CATALOG: { name: catalogName, path: catalogPath } } } = CONSTANTS;

const createComponent = (Component, to, Icon, title, options) => {
  const { theme: { hoveredTheme, bgInvertedHoveredTheme } } = useSelector(({ themes }) => themes);
  const classes = cx(
    options?.className,
    options?.invertedHovered ? bgInvertedHoveredTheme : hoveredTheme,
    'h-100 w-100 d-flex align-items-center'
  );

  const Child = () => (<><Icon /><span className='ms-2'>{title}</span></>);
  return options?.external
    ? <a href={to} target='_blank' rel='noreferrer' className={classes}><Child /></a>
    : <Component as={Link} to={to} className={classes}><Child /></Component>;
};

const Catalog = ({ Component, options }) =>
  createComponent(Component, `/${catalogPath}`, CatalogIcon, catalogName, options);

const FAQ = ({ Component, options }) =>
  createComponent(Component, '#', FAQIcon, 'FAQ', options);

const News = ({ Component, options }) =>
  createComponent(Component, '#', NewsIcon, 'News', options);

const Contacts = ({ Component, options }) =>
  createComponent(Component, '#', ContactsIcon, 'Contacts', options);

const Random = ({ Component, options }) =>
  createComponent(Component, '#', RandomIcon, 'Random', options);

const Github = ({ Component, options }) =>
  createComponent(Component, 'https://github.com/Wysogota/mangoose', GithubIcon, 'Github', {
    external: true,
    invertedHovered: false
  });


export { default as Search } from './Search';
export { default as Theme } from './Theme';
export { Catalog, FAQ, News, Contacts, Random, Github };
