import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import VolumeChapters from './VolumeChapters';

const Volumes = () => {
  const { theme: { invertedColor } } = useSelector(({ themes }) => themes);
  const { chapters } = useSelector(({ chapters }) => chapters);

  const getVolumesList = () => [...new Set(
    chapters.map(({ attributes: { volume } }) => volume)
  )];

  const classes = cx(
    `accordion-${invertedColor} inverted`,
    'mb-3',
  );

  return (
    <article>{
      getVolumesList().map((volume, i) =>
        <Accordion key={volume} className={classes} defaultActiveKey={i}>
          <Accordion.Item eventKey={i}>
            <Accordion.Header>Volume {volume}</Accordion.Header>
            <Accordion.Body>
              <VolumeChapters volumeName={volume} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )
    }</article>
  );
};

export default Volumes;