import { FC } from 'react';
import { useLocation } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();

  const handleLogout = () => {};

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
