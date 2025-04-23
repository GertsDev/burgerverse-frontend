import { getUserState } from '@slices/userSlice';
import { AppHeaderUI } from '@ui';
import { FC } from 'react';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const { user } = useSelector(getUserState);
  const userName = user ? user.name : '';

  return <AppHeaderUI userName={userName} />; // Передаем имя пользователя в компонент UI
};
