import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsChevronDoubleRight as TransitionIcon } from 'react-icons/bs';
import cx from 'classnames';
import styles from './GenreButton.module.scss';

const GenreButton = (props) => {
  const { title, to } = props;
  const { theme: { mainColor, bgAccentTheme, bgInvertedHoveredTheme } } = useSelector(({ themes }) => themes);

  const [linkHover, setLinkHover] = useState(false);
  const [titleHover, setTitleHover] = useState(false);

  const titleClasses = cx(
    styles.title,
    bgInvertedHoveredTheme,
    linkHover && bgAccentTheme,
  );
  
  const linkClasses = cx(
    bgInvertedHoveredTheme,
    titleHover && bgAccentTheme,
  );

  return (
    <ButtonGroup className={styles.button_group}>
      <Button
        className={titleClasses}
        variant={mainColor}
        onMouseEnter={() => setTitleHover(true)}
        onMouseLeave={() => setTitleHover(false)}
      >
        {title}
      </Button>
      <Button
        className={linkClasses}
        variant={mainColor}
        onMouseEnter={() => setLinkHover(true)}
        onMouseLeave={() => setLinkHover(false)}
      >
        <Link to={to}><TransitionIcon /></Link>
      </Button>
    </ButtonGroup>
  );
};

export default GenreButton;
