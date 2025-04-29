import { useDispatch, useSelector } from '@redux-store';
import { getUserState } from '@slices/userSlice';
import {
  Button,
  Input,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import { FC, SyntheticEvent, useState } from 'react';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { login } from '../../services/authActions';
import commonStyles from '../common.module.css';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector(getUserState);
  const [attemptedLogin, setAttemptedLogin] = useState(false);
  const location = useLocation();

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname || '/';

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    setAttemptedLogin(true);
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const errorMessage = attemptedLogin ? error : '';

  return (
    <main className={commonStyles.container}>
      <div className={`pt-6 ${commonStyles.wrapCenter}`}>
        <h3 className='pb-6 text text_type_main-medium'>Space Burger Login</h3>
        <form
          className={`pb-15 ${commonStyles.form}`}
          name='login'
          onSubmit={handleSubmit}
        >
          <>
            <div className='pb-6'>
              <Input
                type='email'
                placeholder='Enter your space email'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                name='email'
                error={false}
                errorText=''
                size='default'
                onPointerEnterCapture={() => {}}
                onPointerLeaveCapture={() => {}}
              />
            </div>
            <div className='pb-6'>
              <PasswordInput
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                name='password'
              />
            </div>
            <div className={`pb-6 ${commonStyles.button}`}>
              <Button type='primary' size='medium' htmlType='submit'>
                Login
              </Button>
            </div>
            {errorMessage && (
              <p
                className={`${commonStyles.error} text text_type_main-default pb-6`}
              >
                {errorMessage}
              </p>
            )}
          </>
        </form>
        <div
          className={`pb-4 ${commonStyles.question} text text_type_main-default`}
        >
          New to Burgerverse?
          <Link to='/register' className={`pl-2 ${commonStyles.link}`}>
            Join
          </Link>
        </div>
        <div
          className={`${commonStyles.question} text text_type_main-default pb-6`}
        >
          Forgot your password?
          <Link to={'/forgot-password'} className={`pl-2 ${commonStyles.link}`}>
            Recover
          </Link>
        </div>
      </div>
    </main>
  );
};
