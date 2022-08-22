import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import MainHeader from '../../components/Headers/MainHeader';
import ColBlock from '../../components/Blocks/ColBlock';
import AvatarForm from './AvatarForm';
import ModalAvatarEditor from '../../components/Avatar/ModalAvatarEditor';

const Settings = () => {
  const [avatar, setAvatar] = useState();
  const [showAvatarEditor, setShowAvatarEditor] = useState(false);

  return (
    <>
      <Container>
        <Row>
          <ColBlock>
            <MainHeader>Settings</MainHeader>
          </ColBlock>
        </Row>
        <Row>
          <ColBlock>
            <AvatarForm setAvatar={setAvatar} setShowEditor={setShowAvatarEditor} className='pb-3' />
          </ColBlock>
        </Row>
      </Container>
      {avatar &&
        <ModalAvatarEditor show={showAvatarEditor} setShow={setShowAvatarEditor} avatar={avatar} />
      }
    </>
  );
};

export default Settings;
