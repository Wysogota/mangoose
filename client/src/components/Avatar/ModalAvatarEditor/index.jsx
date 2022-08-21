import React, { useEffect, useRef, useState } from 'react';
import { bindActionCreators } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import * as actionCreators from '../../../redux/actions/actionCreators';
import AvatarEditor from 'react-avatar-editor';
import cx from 'classnames';
import { Button, Form, Modal } from 'react-bootstrap';
import CloseButton from '../../CloseButton';

const ModalAvatarEditor = (props) => {
  const { show, setShow, avatar } = props;
  const { theme: { mainTheme, bgTheme, invertedColor } } = useSelector(({ themes }) => themes);
  const { isUploaded } = useSelector(({ avatar }) => avatar);
  const { token } = useSelector(({ auth }) => auth);
  const { uploadAvatar, getMe } = bindActionCreators(actionCreators, useDispatch());
  const [zoom, setZoom] = useState(1);
  const editor = useRef(null);

  useEffect(() => {
    if (isUploaded) {
      closeHandle();
      getMe({ token });
    }
  }, [isUploaded]);

  const closeHandle = () => setShow(false);
  const zoomChangeHandle = (e) => setZoom(Number(e.target.value));
  const submitHandle = () => {
    const canvas = editor.current.getImageScaledToCanvas();
    canvas.toBlob((blob) => {
      const formData = new FormData();
      formData.append('avatar', blob, avatar.name);
      uploadAvatar(formData, token);
    });
  };

  const contentClasses = cx(mainTheme, bgTheme);

  return (
    <Modal show={show} backdrop='static' size='lg' contentClassName={contentClasses}>
      <Modal.Header className='text-uppercase'>
        <Modal.Title>Edit Avatar</Modal.Title>
        <CloseButton onClick={closeHandle} />
      </Modal.Header>
      <Modal.Body className='p-4'>
        <AvatarEditor
          ref={editor}
          image={avatar}
          width={512} height={512}
          border={32} borderRadius={16}
          scale={zoom}
          className='rounded w-100 h-100'
        />
      </Modal.Body>
      <Modal.Footer className='flex-column'>
        <Form.Range
          value={zoom}
          min={1} max={3} step={0.1}
          onChange={zoomChangeHandle}
        />
        <Button onClick={submitHandle} variant={invertedColor}>Save</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAvatarEditor;
