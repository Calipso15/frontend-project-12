import { Modal } from 'react-bootstrap';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Add from './Add';
import Rename from './Rename';
import Remove from './Delete';
import { closeModal } from '../../redux/reducers/modalSlice';

const modals = {
  add: Add,
  delete: Remove,
  renaming: Rename,
};

const ChatModal = () => {
  const dispatch = useDispatch();
  const { type, isOpen } = useSelector((state) => state.modal);
  if (!isOpen) {
    return null;
  }
  const CurrModal = modals[type];
  const onHide = () => dispatch(closeModal());
  return (
    <Modal show={isOpen} centered onHide={onHide}>
      <CurrModal onHide={onHide} />
    </Modal>
  );
};

export default ChatModal;
