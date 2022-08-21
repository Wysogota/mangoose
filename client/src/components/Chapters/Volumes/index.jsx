import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import VolumeChapters from './VolumeChapters';

const Volumes = (props) => {
  const { chapters } = props;
  const { theme: { invertedColor, bgAccentTheme } } = useSelector(({ themes }) => themes);

  const getVolumesList = () => [...new Set(
    chapters.map(({ attributes: { volume } }) => volume)
  )];

  const classes = cx(
    `accordion-${invertedColor} inverted`,
    bgAccentTheme,
    'rounded mb-3',
  );

  return (
    <section>{
      getVolumesList().map((volume) =>
        <Accordion key={volume} className={classes} defaultActiveKey={volume}>
          <Accordion.Item eventKey={volume} >
            <Accordion.Header>Volume {volume}</Accordion.Header>
            <Accordion.Body>
              <VolumeChapters chapters={chapters} volumeName={volume} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )
    }</section>
  );
};

export default Volumes;