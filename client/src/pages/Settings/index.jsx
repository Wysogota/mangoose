import React, { useState } from 'react';
import AvatarForm from './AvatarForm';
import ModalAvatarEditor from '../../components/Avatar/ModalAvatarEditor';

const Settings = () => {
  const [avatar, setAvatar] = useState();
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);

  return (
    <div>
      <div>Settings</div>
      <AvatarForm setAvatar={setAvatar} setShowEditor={setShowAvatarEditor} />
      <ModalAvatarEditor show={showAvatarEditor} setShow={setShowAvatarEditor} avatar={avatar} />
    </div>
  );
};

export default Settings;
