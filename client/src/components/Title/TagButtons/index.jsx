import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button, Dropdown } from 'react-bootstrap';
import { isEmpty } from 'lodash';
import cx from 'classnames';
import styles from './TagButtons.module.scss';
import CONSTANTS from '../../../constants';

const TagButtons = (props) => {
  const { tags, shouldOverflow } = props;
  const { theme, theme: { invertedColor, mainColor } } = useSelector(({ themes }) => themes);

  const containerRef = useRef(null);
  const tagsRef = useRef([]);
  const overflowedTagsRef = useRef([]);
  const [containerPosition, setContainerPosition] = useState();

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
    if (shouldOverflow) {
      if (!isEmpty(tagsRef)) {
        tagsRef.current.forEach((tag) => {
          const tagPosition = tag.offsetLeft + tag.offsetWidth;
          const hideClassName = 'invisible';

          tagPosition >= containerPosition
            ? tag.classList.add(hideClassName)
            : tag.classList.remove(hideClassName);
        });
      }

      if (!isEmpty(overflowedTagsRef)) {
        overflowedTagsRef.current.forEach((tag, i) => {
          const tagPosition = tagsRef.current[i].offsetLeft + tagsRef.current[i].offsetWidth;
          const hideClassName = 'd-none';

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
    styles.button,
    'p-1 me-2'
  );

  const overflowedTagsClasses = cx(
    styles.button,
    'p-1 me-2 w-100'
  );

  return (
    <div className={styles.tags_container}>
      <div ref={containerRef} className={containerClasses}>{
        tags.map(({ attributes: { name } }, i) => {
          const localeName = name[CONSTANTS.DEFAULT_LOCALE];
          return (
            <Button
              key={localeName}
              ref={(tag) => tagsRef.current[i] = tag}
              variant={invertedColor}
              className={tagsClasses}
            >
              {localeName}
            </Button>
          );
        })
      }</div>
      {shouldOverflow && <Dropdown>
        <Dropdown.Toggle className={toggleClasses} variant={mainColor}></Dropdown.Toggle>
        <Dropdown.Menu variant={invertedColor} align='end' renderOnMount>{
          tags.map(({ attributes: { name } }, i) => {
            const localeName = name[CONSTANTS.DEFAULT_LOCALE];
            return (
              <Button
                key={localeName}
                ref={(tag) => overflowedTagsRef.current[i] = tag}
                variant={mainColor}
                className={overflowedTagsClasses}
              >
                {localeName}
              </Button>
            );
          })
        }</Dropdown.Menu>
      </Dropdown>}
    </div>
  );
};

export default TagButtons;
