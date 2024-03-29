import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Dropdown } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import cx from 'classnames';
import { getLocaleValue } from '../../../common/functions';
import styles from './TagButtons.module.scss';
import CONSTANTS from '../../../constants';
const {
  PARAM_NAME: { FILTER: { TAGS } },
  PAGES: { CATALOG: { path } }
} = CONSTANTS;

const getPath = (id) => `${path}?${TAGS}=${id}`;

const TagButtons = (props) => {
  const { tags, tagClassName, shouldOverflow } = props;
  const { theme, theme: { invertedColor, mainColor, bgInvertedHoveredTheme } } = useSelector(({ themes }) => themes);

  const containerRef = useRef(null);
  const tagsRef = useRef([]);
  const overflowedTagsRef = useRef([]);
  const [containerPosition, setContainerPosition] = useState();
  const [shouldDisplayDropdown, setShouldDisplayDropdown] = useState(true);

  const getConatinerPosition = () => {
    const { offsetWidth, offsetLeft } = containerRef.current;
    setContainerPosition(offsetWidth + offsetLeft);
  };

  useEffect(() => {
    if (shouldOverflow) {
      getConatinerPosition();
      addEventListener('resize', getConatinerPosition);
      return () => removeEventListener('resize', getConatinerPosition);
    }
  }, []);

  useEffect(() => {
    if (shouldOverflow && containerPosition) {

      if (!isEmpty(tagsRef.current)) {
        tagsRef.current.forEach((tag) => {
          const tagPosition = tag.offsetLeft + tag.offsetWidth;
          const hideClassName = 'invisible';

          tagPosition >= containerPosition
            ? tag.classList.add(hideClassName)
            : tag.classList.remove(hideClassName);
        });
        setShouldDisplayDropdown(
          !tagsRef.current.every((tag) => !tag.classList.contains('invisible'))
        );
      } else {
        setShouldDisplayDropdown(false);
      }

      if (!isEmpty(overflowedTagsRef.current)) {
        overflowedTagsRef.current.forEach((tag, i) => {
          const tagPosition = tagsRef.current[i].offsetLeft + tagsRef.current[i].offsetWidth;
          const hideClassName = 'd-none';

          if (!tag) return;
          tagPosition < containerPosition
            ? tag.classList.add(hideClassName)
            : tag.classList.remove(hideClassName);
        });
      }
    }
  }, [tagsRef, theme, overflowedTagsRef, containerPosition]);

  const containerClasses = cx(
    shouldOverflow ? styles.visible_container : styles.conatiner
  );

  const toggleClasses = cx(
    styles.toggle,
    styles[`toggle-${mainColor}`]
  );

  const tagsClasses = cx(
    styles.tag,
    tagClassName,
    'p-1 me-2'
  );

  const overflowedTagsClasses = cx(
    styles.overflow_tag,
    bgInvertedHoveredTheme,
    'p-1 me-2 w-100'
  );

  return (
    <div className={styles.tags_container}>
      <div ref={containerRef} className={containerClasses}>{
        tags.map(({ id, attributes: { name } }, i) => (
          <Button key={id}
            ref={(tag) => tagsRef.current[i] = tag}
            variant={invertedColor}
            className={tagsClasses}
          >
            <Link to={getPath(id)} >{getLocaleValue(name)}</Link>
          </Button>
        ))
      }</div>
      {shouldOverflow && shouldDisplayDropdown && <Dropdown>
        <Dropdown.Toggle className={toggleClasses} variant={mainColor}></Dropdown.Toggle>
        <Dropdown.Menu variant={invertedColor} align='end' renderOnMount>{
          tags.map(({ id, attributes: { name } }, i) => (
            <Dropdown.Item as={Link} key={id}
              to={getPath(id)}
              ref={(tag) => overflowedTagsRef.current[i] = tag}
              className={overflowedTagsClasses}
            >
              {getLocaleValue(name)}
            </Dropdown.Item>
          ))
        }</Dropdown.Menu>
      </Dropdown>}
    </div>
  );
};

TagButtons.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  tagClassName: PropTypes.string,
  shouldOverflow: PropTypes.bool,
};

export default TagButtons;
