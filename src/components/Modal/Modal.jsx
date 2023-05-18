import React, { useEffect} from 'react';
import { ModalContainer, ModalContent, ModalImg } from './Modal.styled';
import { createPortal } from 'react-dom';


const modalRoot = document.querySelector('#modal-root');
function Modal({onCloseModal, imgSrc}) {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    
    return() => window.removeEventListener('keydown', handleKeyDown);
  }, [])
 
  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };
  function handleKeyDown (event){
    if (event.code === 'Escape') {
      onCloseModal();
    }
  }


    return createPortal(
      <ModalContainer onClick={handleBackdropClick}>
        <ModalContent>
          <ModalImg src={imgSrc} />
        </ModalContent>
      </ModalContainer>,
      modalRoot
    );
  }

export { Modal };
