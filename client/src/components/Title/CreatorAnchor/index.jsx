import React from 'react';
import { selectRelationship } from '../../../common/functions';
import styles from './CreatorAnchor.module.scss';

const CreatorAnchor = (props) => {
  const { relationships, type, Icon } = props;

  const creatorLink = (type, creatorId) => `https://mangadex.org/${type}/${creatorId}`;

  const isCreaterUser = type === 'user';
  const createrName = isCreaterUser ? 'username' : 'name';
  const propValue = isCreaterUser ? 'user' : 'scanlation_group';
  const creator = selectRelationship(relationships, propValue);

  if (!creator) return null;

  return (
    <a href={creatorLink(type, creator.id)} className={styles.creator_name} target='_blank' rel='noreferrer'>
      <Icon />
      <span className='ms-2'>{creator.attributes[createrName]}</span>
    </a>);
};

export default CreatorAnchor;