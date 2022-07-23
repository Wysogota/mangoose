import React from 'react';
import { Accordion } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import VolumeChapters from './VolumeChapters';
import styles from './Volumes.module.scss';

const Volumes = (props) => {
  const { chapters } = props;
  const { theme: { invertedColor, mainColor } } = useSelector(({ themes }) => themes);

  const getVolumesList = () => [...new Set(
    chapters.map(({ attributes: { volume } }) => volume)
  )];

  return (
    <section>{
      getVolumesList().map((volume) =>
        <Accordion key={volume}
          className={
            `accordion-${invertedColor} rounded mb-3 `
            + styles[`volume-${mainColor}`]
          }
          defaultActiveKey={volume}
        >
          <Accordion.Item eventKey={volume} >
            <Accordion.Header className={styles.header}>Volume {volume}</Accordion.Header>
            <Accordion.Body >{<VolumeChapters chapters={chapters} volumeName={volume} />}</Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )
    }</section>
  );
};

export default Volumes;