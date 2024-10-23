import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { Preloader } from '../ui/preloader';
import { getUserState } from '../../services/slices/userSlice';

type ProtectedRouteProps = {
  onlyAuthorized?: boolean;
};

export const ProtectedRoute = ({ onlyAuthorized }: ProtectedRouteProps) => {
  const location = useLocation();
  const { isAuthChecked, isAuthenticated, loading } = useSelector(getUserState);

  console.log(isAuthChecked, isAuthenticated);

  if (loading || !isAuthChecked) {
    return <Preloader />;
  }

  if (onlyAuthorized === false && isAuthenticated) {
    return <Navigate replace to='/' />;
  }

  if (onlyAuthorized === true && !isAuthenticated) {
    return <Navigate replace to='/login' state={{ from: location }} />;
  }

  return <Outlet />;
};
