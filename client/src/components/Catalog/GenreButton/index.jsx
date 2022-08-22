import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';
import { Link, useSearchParams } from 'react-router-dom';
import { BsChevronDoubleRight as TransitionIcon } from 'react-icons/bs';
import cx from 'classnames';
import styles from './GenreButton.module.scss';
import CONSTANTS from '../../../constants';
const { PARAM_NAME: { FILTER: { TAGS } } } = CONSTANTS;

const GenreButton = (props) => {
  const { id, title, to, onClick } = props;
  const { theme: { mainColor, invertedColor, bgAccentTheme, bgInvertedHoveredTheme } } = useSelector(({ themes }) => themes);

  const [searchParams] = useSearchParams();
  const checkClicked = searchParams.getAll(TAGS).includes(id);

  const [clicked, setClicked] = useState(checkClicked);
  const [linkHover, setLinkHover] = useState(false);
  const [titleHover, setTitleHover] = useState(false);

  const onClickHandle = () => {
    onClick();
    setClicked(current => !current);
  };

  const buttonGroupClasses = cx(
    styles.button_group,
    'mb-2 me-2',
  );

  const titleClasses = cx(
    styles.title,
    bgInvertedHoveredTheme,
    !clicked && linkHover && bgAccentTheme,
    'border-0',
  );

  const linkClasses = cx(
    bgInvertedHoveredTheme,
    titleHover && bgAccentTheme,
    clicked && bgAccentTheme,
    'border-0',
  );

  return (
    <ButtonGroup className={buttonGroupClasses}>
      <Button
        className={titleClasses}
        variant={clicked ? invertedColor : mainColor}
        onClick={onClickHandle}
        onMouseEnter={() => setTitleHover(true)}
        onMouseLeave={() => setTitleHover(false)}
      >
        {title}
      </Button>
      {to && <Button
        className={linkClasses}
        variant={mainColor}
        onMouseEnter={() => setLinkHover(true)}
        onMouseLeave={() => setLinkHover(false)}
      >
        <Link to={to}><TransitionIcon /></Link>
      </Button>}
    </ButtonGroup>
  );
};

GenreButton.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export default GenreButton;
