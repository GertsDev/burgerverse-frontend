import { useDispatch, useSelector } from '@redux-store';
import { getUserState } from '@slices/userSlice';
import { RegisterUI } from '@ui-pages';
import { FC, SyntheticEvent, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { registerUser } from '../../services/authActions';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector(getUserState);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(registerUser({ name: userName, email, password }));
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <RegisterUI
      errorText={error || ''}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
