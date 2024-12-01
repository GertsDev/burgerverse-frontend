import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getUserState } from '../../services/slices/userSlice';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyAuthorized?: boolean;
};

export const ProtectedRoute = ({ onlyAuthorized }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, isAuthChecked } = useSelector(getUserState);

  // Пока авторизация не проверена, показываем прелоадер
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // Если маршрут не требует авторизации, но пользователь авторизован, редиректим на главную страницу
  if (!onlyAuthorized && isAuthenticated) {
    return <Navigate replace to='/' />;
  }

  // Если маршрут требует авторизации, но пользователь не авторизован, редиректим на страницу логина
  if (onlyAuthorized && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  // Если все условия соблюдены, рендерим дочерние компоненты через <Outlet />
  return <Outlet />;
};
