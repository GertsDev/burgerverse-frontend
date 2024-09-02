import { FC, SyntheticEvent } from 'react';

export const Profile: FC = () => {
  // const [formValue, setFormValue] = useState({
  //   name: user.name,
  //   email: user.email,
  //   password: ''
  // });

  // useEffect(() => {
  //   setFormValue((prevState) => ({
  //     ...prevState,
  //     name: user?.name || '',
  //     email: user?.email || ''
  //   }));
  // }, [user]);

  // const isFormChanged =
  //   formValue.name !== user?.name ||
  //   formValue.email !== user?.email ||
  //   !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    // setFormValue({
    //   name: user.name,
    //   email: user.email,
    //   password: ''
    // });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setFormValue((prevState) => ({
    //   ...prevState,
    //   [e.target.name]: e.target.value
    // }));
  };

  // return (
  //   <ProfileUI
  //     formValue={formValue}
  //     isFormChanged={isFormChanged}
  //     handleCancel={handleCancel}
  //     handleSubmit={handleSubmit}
  //     handleInputChange={handleInputChange}
  //   />
  // );

  return null;
};
