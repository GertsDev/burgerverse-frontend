import { useDispatch, useSelector } from '@redux-store';
import { getUserState } from '@slices/userSlice';
import {
  Button,
  Input,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import { FC, SyntheticEvent, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { registerUser } from '../../services/authActions';
import commonStyles from '../common.module.css';

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
    <main className={commonStyles.container}>
      <div className={`pt-6 ${commonStyles.wrapCenter}`}>
        <h3 className='pb-6 text text_type_main-medium'>
          Space Burger Registration
        </h3>
        <form
          className={`pb-15 ${commonStyles.form}`}
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
            <div className={`pb-6 ${commonStyles.button}`}>
              <Button type='primary' size='medium' htmlType='submit'>
                Join the Space Burger Crew
              </Button>
            </div>
            {error && (
              <p
                className={`${commonStyles.error} text text_type_main-default pb-6`}
              >
                {error}
              </p>
            )}
          </>
        </form>
        <div
          className={`${commonStyles.question} text text_type_main-default pb-6`}
        >
          Already part of the Space Crew?
          <Link to='/login' className={`pl-2 ${commonStyles.link}`}>
            Launch In
          </Link>
        </div>
      </div>
    </main>
  );
};
