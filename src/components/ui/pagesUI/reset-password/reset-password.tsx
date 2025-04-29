import {
  Button,
  Input,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from '../common.module.css';
import { ResetPasswordUIProps } from './type';

export const ResetPasswordUI: FC<ResetPasswordUIProps> = ({
  errorText,
  password,
  setPassword,
  handleSubmit,
  token,
  setToken
}) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-medium'>Password Recovery</h3>
      <form
        className={`pb-15 ${styles.form}`}
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
        <div className={`pb-6 ${styles.button}`}>
          <Button type='primary' size='medium' htmlType='submit'>
            Save
          </Button>
        </div>
        {errorText && (
          <p className={`${styles.error} text text_type_main-default pb-6`}>
            {errorText}
          </p>
        )}
      </form>
      <div className={`${styles.question} text text_type_main-default pb-6`}>
        Remembered your password?
        <Link to='/login' className={`pl-2 ${styles.link}`}>
          Login
        </Link>
      </div>
    </div>
  </main>
);
