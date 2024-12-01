import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { getUserState } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { user } = useSelector(getUserState);
  const userName = user ? user.name : '';

  return <AppHeaderUI userName={userName} />; // Передаем имя пользователя в компонент UI
};
