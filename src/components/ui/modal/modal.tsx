import { CloseIcon } from '@zlden/react-developer-burger-ui-components';
import { FC, ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import styles from './modal.module.css';

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;
}

const modalRoot = document.getElementById('modals');

export const Modal: FC<ModalProps> = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  if (!modalRoot) return null;

  return createPortal(
    <>
      <div className={styles.modal} data-cy='modal'>
        <div className={styles.header}>
          {title && (
            <h3 className={`${styles.title} text text_type_main-large`}>
              {title}
            </h3>
          )}
          <button
            className={styles.button}
            type='button'
            onClick={onClose}
            data-cy='modal-close'
            aria-label='Close modal'
          >
            <CloseIcon type='primary' />
          </button>
        </div>
        <div className={styles.content}>{children}</div>
      </div>
      <ModalOverlay onClick={onClose} />
    </>,
    modalRoot
  );
};
