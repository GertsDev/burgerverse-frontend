import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { getUserState } from '../../services/slices/userSlice';
import { Navigate, useLocation } from 'react-router-dom';
import { login } from '../../services/authActions';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector(getUserState);
  const location = useLocation();

  // Получаем откуда пришел пользователь
  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      // Ждем завершения логина
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      console.error('Login error:', err); // Обрабатываем ошибку, если нужно
    }
  };

  // Если пользователь уже авторизован, перенаправляем его на страницу, с которой он пришел
  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
