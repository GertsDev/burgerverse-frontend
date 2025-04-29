import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { resetPasswordApi } from '@api/auth-api';
import {
  Button,
  Input,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import commonStyles from '../common.module.css';

export const ResetPassword: FC = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    resetPasswordApi({ password, token })
      .then(() => {
        setError(null);
        localStorage.removeItem('resetPassword');
        navigate('/login');
      })
      .catch((err) => setError(err));
  };

  useEffect(() => {
    if (!localStorage.getItem('resetPassword')) {
      navigate('/forgot-password', { replace: true });
    }
  }, [navigate]);

  return (
    <main className={commonStyles.container}>
      <div className={`pt-6 ${commonStyles.wrapCenter}`}>
        <h3 className='pb-6 text text_type_main-medium'>Password Recovery</h3>
        <form
          className={`pb-15 ${commonStyles.form}`}
          name='login'
          onSubmit={handleSubmit}
        >
          <div className='pb-6'>
            <PasswordInput
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              name='password'
            />
          </div>
          <div className='pb-6'>
            <Input
              type='text'
              placeholder='Enter the verification code sent to your email '
              onChange={(e) => setToken(e.target.value)}
              value={token}
              name='token'
              error={false}
              errorText=''
              size='default'
              onPointerEnterCapture={() => {
                console.log('onPointerEnterCapture');
              }}
              onPointerLeaveCapture={() => {
                console.log('onPointerLeaveCapture');
              }}
            />
          </div>
          <div className={`pb-6 ${commonStyles.button}`}>
            <Button type='primary' size='medium' htmlType='submit'>
              Save
            </Button>
          </div>
          {error && (
            <p
              className={`${commonStyles.error} text text_type_main-default pb-6`}
            >
              {error.message}
            </p>
          )}
        </form>
        <div
          className={`${commonStyles.question} text text_type_main-default pb-6`}
        >
          Remembered your password?
          <Link to='/login' className={`pl-2 ${commonStyles.link}`}>
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};
