import { ProfileMenu } from '@components';
import { useDispatch, useSelector } from '@redux-store';
import { getUserState } from '@slices/userSlice';
import { Button, Input } from '@zlden/react-developer-burger-ui-components';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { updateUser } from '../../services/authActions';
import commonStyles from '../common.module.css';
import pageStyles from './profile.module.css';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(getUserState);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  // Обновляем форму только когда user изменяется
  useEffect(() => {
    if (
      user &&
      (formValue.name !== user.name || formValue.email !== user.email)
    ) {
      setFormValue((prevState) => ({
        ...prevState,
        name: user.name,
        email: user.email
      }));
    }
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      updateUser({
        name: formValue.name,
        email: formValue.email,
        ...(formValue.password && { password: formValue.password })
      })
    );
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <main className={`${commonStyles.container}`}>
      <div className={`mt-30 mr-15 ${pageStyles.menu}`}>
        <ProfileMenu />
      </div>
      <form
        className={`mt-30 ${pageStyles.form} ${commonStyles.form}`}
        onSubmit={handleSubmit}
      >
        <>
          <div className='pb-6'>
            <Input
              type={'text'}
              placeholder={'Имя'}
              onChange={handleInputChange}
              value={formValue.name}
              name={'name'}
              error={false}
              errorText={''}
              size={'default'}
              icon={'EditIcon'}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            />
          </div>
          <div className='pb-6'>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={handleInputChange}
              value={formValue.email}
              name={'email'}
              error={false}
              errorText={''}
              size={'default'}
              icon={'EditIcon'}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            />
          </div>
          <div className='pb-6'>
            <Input
              type={'password'}
              placeholder={'Пароль'}
              onChange={handleInputChange}
              value={formValue.password}
              name={'password'}
              error={false}
              errorText={''}
              size={'default'}
              icon={'EditIcon'}
              onPointerEnterCapture={() => {}}
              onPointerLeaveCapture={() => {}}
            />
          </div>
          {isFormChanged && (
            <div className={pageStyles.button}>
              <Button
                type='secondary'
                htmlType='button'
                size='medium'
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button type='primary' size='medium' htmlType='submit'>
                Save
              </Button>
            </div>
          )}
        </>
      </form>
    </main>
  );
};
