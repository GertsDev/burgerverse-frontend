import { FC } from 'react';

// Import renamed CSS module
import styles from './modal-overlay.module.css';

// Define props inline
interface ModalOverlayProps {
  onClick: () => void;
}

// Rename the exported component
export const ModalOverlay: FC<ModalOverlayProps> = ({ onClick }) => (
  <div className={styles.overlay} onClick={onClick} data-cy='modal-overlay' />
);
