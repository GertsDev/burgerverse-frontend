import styles from './modal-overlayUI.module.css';

export const ModalOverlayUI = ({ onClick }: { onClick: () => void }) => (
  <div className={styles.overlay} onClick={onClick} data-cy='modal-overlay' />
);
