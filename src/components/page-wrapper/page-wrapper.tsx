import { FC } from 'react';
import styles from './page-wrapper.module.css';
import { PageWrapperProps } from './type';
import { useParams } from 'react-router-dom';

export const PageWrapper: FC<PageWrapperProps> = ({
  title,
  paramHandle,
  children
}) => {
  const { number } = useParams(); // Извлекаем номер заказа из параметров URL

  // Проверяем наличие флага paramHandle
  const displayTitle = paramHandle && number ? `#${number}` : title;

  // Устанавливаем класс в зависимости от наличия paramHandle
  const titleClass = paramHandle
    ? `text text_type_digits-medium ${styles.title}`
    : `text text_type_main-medium ${styles.title}`;

  return (
    <div className={styles.wrapper}>
      <h2 className={titleClass}>{displayTitle}</h2>
      {/* Отображаем переданный контент */}
      {children}
    </div>
  );
};
