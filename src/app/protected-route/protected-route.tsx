import { Preloader } from '@ui/index';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getUserState } from '../../services/slices/userSlice';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyAuthorized?: boolean;
};

export const ProtectedRoute = ({ onlyAuthorized }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthenticated, isAuthChecked } = useSelector(getUserState);

  // While authentication is being checked, show the preloader
  if (!isAuthChecked) {
    return <Preloader />;
  }

  // If the route does not require authorization, but the user is authenticated, redirect to the main page
  if (!onlyAuthorized && isAuthenticated) {
    return <Navigate replace to='/' />;
  }

  // If the route requires authorization, but the user is not authenticated, redirect to the login page
  if (onlyAuthorized && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  // If all conditions are met, render the child components via <Outlet />
  return <Outlet />;
};
