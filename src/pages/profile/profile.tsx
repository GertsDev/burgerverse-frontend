import { ProfileMenu } from '@components';
import { useDispatch, useSelector } from '@redux-store';
import { getUserState } from '@slices/userSlice';
import { Modal } from '@ui/modal'; // Your Modal component
// Removed Ant Design message import as we're using modals for both success and error
// import { message } from 'antd';
import { Preloader } from '@ui/preloader';
import {
  Button,
  Input,
  PasswordInput
} from '@zlden/react-developer-burger-ui-components';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { updateUser } from '../../services/authActions';
import commonStyles from '../common.module.css';
import pageStyles from './profile.module.css';

export const Profile: FC = () => {
  const dispatch = useDispatch();
  const { user, loading } = useSelector(getUserState);

  const [formValue, setFormValue] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isUserLoaded, setIsUserLoaded] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // 1. Add state for error modal visibility and message
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
      setIsUserLoaded(true);
    } else {
      setFormValue({ name: '', email: '', password: '' });
      setIsUserLoaded(false);
    }
  }, [user]);

  const isFormChanged = isUserLoaded
    ? formValue.name !== user?.name ||
      formValue.email !== user?.email ||
      !!formValue.password
    : false;

  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    if (!isFormChanged || !user) return;

    const updateData: { name: string; email: string; password?: string } = {
      name: formValue.name,
      email: formValue.email
    };
    if (formValue.password) {
      updateData.password = formValue.password;
    }

    try {
      await dispatch(updateUser(updateData)).unwrap();
      setShowSuccessModal(true); // Show success modal
      setFormValue((prev) => ({ ...prev, password: '' }));
      setShowErrorModal(false); // Ensure error modal is closed on success
      setErrorMessage(null); // Clear any previous error message
    } catch (error: any) {
      console.error('Failed to update profile:', error);

      // 2. Set error state and show error modal
      const friendlyErrorMessage =
        error?.message || 'Failed to update profile. Please try again.';
      setErrorMessage(friendlyErrorMessage); // Store the message
      setShowErrorModal(true); // Show the error modal
      setShowSuccessModal(false); // Ensure success modal is closed on error
    }
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    if (user) {
      setFormValue({
        name: user.name || '',
        email: user.email || '',
        password: ''
      });
    } else {
      setFormValue({ name: '', email: '', password: '' });
    }
    // Also close modals on cancel if they are open
    setShowSuccessModal(false);
    setShowErrorModal(false);
    setErrorMessage(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    // Optionally hide error modal when user starts typing again
    // if (showErrorModal) {
    //   setShowErrorModal(false);
    //   setErrorMessage(null);
    // }
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  // 3. Add function to close the error modal
  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage(null); // Clear the error message when closing
  };

  return (
    <>
      <main
        className={`${commonStyles.container} ${pageStyles.profileContainer}`}
      >
        {/* ... ProfileMenu and Form structure ... */}
        <div className={`${pageStyles.menuWrapper} `}>
          <ProfileMenu />
        </div>
        <form
          className={` ${pageStyles.formWrapper} ${commonStyles.form}`}
          onSubmit={handleSubmit}
        >
          {/* Inputs */}
          <div className={`${pageStyles.inputWrapper} pb-6`}>
            <label className={pageStyles.label}>Name</label>
            <Input
              type={'text'}
              placeholder={'Name'}
              onChange={handleInputChange}
              value={formValue.name}
              name={'name'}
              error={false} // You might want to link this to the errorMessage state later
              errorText={''}
              size={'default'}
              icon={'EditIcon'}
              extraClass={pageStyles.inputWithIcon}
              disabled={loading}
              onPointerEnterCapture={() => {}} // Consider removing if not needed
              onPointerLeaveCapture={() => {}}
            />
          </div>
          <div className='pb-6'>
            <label className={pageStyles.label}>E-mail</label>
            <Input
              type={'email'}
              placeholder={'E-mail'}
              onChange={handleInputChange}
              value={formValue.email}
              name={'email'}
              error={false} // You might want to link this to the errorMessage state later
              errorText={''}
              size={'default'}
              icon={'EditIcon'}
              extraClass={pageStyles.inputWithIcon}
              disabled={loading}
              onPointerEnterCapture={() => {}} // Consider removing if not needed
              onPointerLeaveCapture={() => {}}
            />
          </div>
          <div className='pb-6'>
            <label className={pageStyles.label}>Password</label>
            <PasswordInput
              placeholder={'Change password'}
              onChange={handleInputChange}
              value={formValue.password}
              name={'password'}
              errorText={''}
              size={'default'}
              icon={'ShowIcon'}
              autoComplete='new-password'
              disabled={loading}
              extraClass={pageStyles.inputWithIcon}
            />
          </div>

          {/* Buttons */}
          <div className={pageStyles.button}>
            {loading && (
              <Modal
                onClose={() => console.log('close')}
                title={'Updating Your Profile...'}
              >
                <Preloader />
              </Modal>
            )}
            <Button
              type='secondary'
              htmlType='button'
              size='medium'
              onClick={handleCancel}
              style={{ marginRight: '8px' }}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type='primary'
              size='medium'
              htmlType='submit'
              disabled={!isFormChanged || loading}
            >
              Save
            </Button>
          </div>
        </form>
      </main>

      {/* Success Modal */}
      {showSuccessModal && (
        <Modal title='Success' onClose={handleCloseSuccessModal}>
          <p className='text text_type_main-medium'>
            Your profile has been updated successfully!
          </p>
        </Modal>
      )}

      {/* 4. Add Error Modal JSX */}
      {showErrorModal && (
        <Modal title='Error' onClose={handleCloseErrorModal}>
          <p
            className='text text_type_main-medium'
            style={{ color: 'var(--colors-interface-error)' }} // Optional: Style error text
          >
            {errorMessage || 'An unexpected error occurred.'}{' '}
            {/* Display stored error message */}
          </p>
        </Modal>
      )}
    </>
  );
};
