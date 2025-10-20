import React from 'react';
import { useModalStore } from '/app/src/stores/modalStore';
import './Modal.css';

const Modal = ({ children, size = 'md' }) => {
  const { isOpen, closeModal } = useModalStore();

  if (!isOpen) return null;

  return (
    <>
      <div className="modal-backdrop" onClick={closeModal}></div>
      
      <div className="modal" style={{ display: 'block' }} onClick={closeModal}>
        <div 
          className={`modal-dialog modal-dialog-centered modal-${size}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
