import { FC, SyntheticEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { forgotPasswordApi } from '@api/auth-api';
import { Button, Input } from '@zlden/react-developer-burger-ui-components';
import commonStyles from '../common.module.css';

export const ForgotPassword: FC = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const navigate = useNavigate();

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setError(null);
    forgotPasswordApi({ email })
      .then(() => {
        localStorage.setItem('resetPassword', 'true');
        navigate('/reset-password', { replace: true });
      })
      .catch((err) => setError(err));
  };

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
            <Input
              type='email'
              placeholder='Enter your email'
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
          <div className={`pb-6 ${commonStyles.button}`}>
            <Button type='primary' size='medium' htmlType='submit'>
              Reset Password
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
          Remember password?
          <Link to={'/login'} className={`pl-2 ${commonStyles.link}`}>
            Login
          </Link>
        </div>
      </div>
    </main>
  );
};
