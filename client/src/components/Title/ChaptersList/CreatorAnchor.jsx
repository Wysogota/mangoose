import React from 'react';
import { selectRelationship } from '../../../common/functions';

const CreatorAnchor = (props) => {
  const { relationships, type, Icon } = props;
  
  const creatorLink = (type, creatorId) => `https://mangadex.org/${type}/${creatorId}`;

  const isCreaterUser = type === 'user';
  const createrName = isCreaterUser ? 'username' : 'name';
  const propValue = isCreaterUser ? 'user' : 'scanlation_group';
  const creator = selectRelationship(relationships, propValue);

  return (
    <a href={creatorLink(type, creator.id)} target='_blank' rel='noreferrer'>
      <Icon />
      <span className='ms-2'>{creator.attributes[createrName]}</span>
    </a>);
};

export default CreatorAnchor;