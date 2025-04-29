import { FC } from 'react';
import styles from './preloader.module.css';

export const Preloader: FC = () => (
  <div className={styles.preloader}>
    <div className={styles.container}>
      <span className={styles.round} />
    </div>
  </div>
);
