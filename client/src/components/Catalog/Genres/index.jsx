import React from 'react';
import { Accordion } from 'react-bootstrap';
import GenreButton from '../GenreButton/GenreButton';
import ToggleTab from '../../ToggleTab';

const data = [
  {
    title: 'Latest',
    href: '#',
    type: 'Time'
  },
  {
    title: 'Newest',
    href: '#',
    type: 'Time'
  },
  {
    title: 'Top View',
    href: '#',
    type: 'Type'
  },
  {
    title: 'Complete',
    href: '#',
    type: 'Type'
  },
  {
    title: 'Ongoing',
    href: '#',
    type: 'Type'
  },
  {
    title: 'Random',
    href: '#',
    type: 'Type'
  },
  {
    title: 'Action',
    href: '#',
    type: 'Genre'
  },
  {
    title: 'Adventure',
    href: '#',
    type: 'Genre'
  },
  {
    title: 'Drama',
    href: '#',
    type: 'Genre'
  },
  {
    title: 'Seinen',
    href: '#',
    type: 'Genre'
  },
  {
    title: 'Psychological',
    href: '#',
    type: 'Genre'
  },
];

const Genres = ({ setGenres }) => {

  const onClickHandle = (title) => {
    setGenres((prevGenres) => {
      title = title.toLowerCase();
      return (prevGenres.includes(title))
        ? prevGenres.filter((item) => item !== title)
        : prevGenres.concat(title);
    });
  };

  return (
    <Accordion>
      <div className='mb-2'>
        <ToggleTab eventKey='1'>By Time</ToggleTab>
        <ToggleTab eventKey='2'>By Type</ToggleTab>
        <ToggleTab eventKey='3'>By Genre</ToggleTab>
      </div>
      <Accordion.Collapse eventKey='1'>
        <div>{
          data
            .filter(({ type }) => type === 'Time')
            .map(({ title, href }) =>
              <GenreButton
                key={title} title={title} to={href}
                onClick={() => onClickHandle(title)}
              />
            )
        }</div>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey='2'>
        <div>{
          data
            .filter(({ type }) => type === 'Type')
            .map(({ title, href }) =>
              <GenreButton
                key={title} title={title} to={href}
                onClick={() => onClickHandle(title)}
              />
            )
        }</div>
      </Accordion.Collapse>
      <Accordion.Collapse eventKey='3'>
        <div>{
          data
            .filter(({ type }) => type === 'Genre')
            .map(({ title, href }) =>
              <GenreButton
                key={title} title={title} to={href}
                onClick={() => onClickHandle(title)}
              />
            )
        }</div>
      </Accordion.Collapse>
    </Accordion >
  );
};

export default Genres;


