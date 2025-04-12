import {
  Button,
  Input,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styles from '../common.module.css';
import { RegisterUIProps } from './type';

export const RegisterUI: FC<RegisterUIProps> = ({
  errorText,
  email,
  setEmail,
  handleSubmit,
  password,
  setPassword,
  userName,
  setUserName
}) => (
  <main className={styles.container}>
    <div className={`pt-6 ${styles.wrapCenter}`}>
      <h3 className='pb-6 text text_type_main-medium'>
        Space Burger Registration
      </h3>
      <form
        className={`pb-15 ${styles.form}`}
        name='register'
        onSubmit={handleSubmit}
      >
        <>
          <div className='pb-6'>
            <Input
              type='text'
              placeholder='Space Commander Name'
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
              name='name'
              error={false}
              errorText=''
              size='default'
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            />
          </div>
          <div className='pb-6'>
            <Input
              type='email'
              placeholder='Space Email'
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
          <div className={`pb-6 ${styles.button}`}>
            <Button type='primary' size='medium' htmlType='submit'>
              Join the Space Burger Crew
            </Button>
          </div>
          {errorText && (
            <p className={`${styles.error} text text_type_main-default pb-6`}>
              {errorText}
            </p>
          )}
        </>
      </form>
      <div className={`${styles.question} text text_type_main-default pb-6`}>
        Already part of the Space Crew?
        <Link to='/login' className={`pl-2 ${styles.link}`}>
          Launch In
        </Link>
      </div>
    </div>
  </main>
);
