export interface PageWrapperProps {
  title: string; // Заголовок страницы
  children: React.ReactNode; // Содержимое страницы
  paramHandle?: boolean; // Нужно ли использовать параметры location для получения номера
}
