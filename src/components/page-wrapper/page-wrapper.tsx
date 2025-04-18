import { FC } from 'react';
import { useParams } from 'react-router-dom';
import styles from './page-wrapper.module.css';
import { PageWrapperProps } from './type';

export const PageWrapper: FC<PageWrapperProps> = ({
  title,
  paramHandle,
  children
}) => {
  const { number } = useParams(); // Extract order number from URL params

  // Check for paramHandle flag
  const displayTitle = paramHandle && number ? `#${number}` : title;

  // Set class depending on paramHandle
  const titleClass = paramHandle
    ? `text text_type_digits-medium ${styles.title}`
    : `text text_type_main-medium ${styles.title}`;

  return (
    <div className={styles.wrapper}>
      <h2 className={titleClass}>{displayTitle}</h2>
      {/* Render passed content */}
      {children}
    </div>
  );
};
