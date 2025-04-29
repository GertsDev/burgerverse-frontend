import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../../../../pages/common-type';

export type RegisterUIProps = PageUIProps & {
  password: string;
  userName: string;
  setPassword: Dispatch<SetStateAction<string>>;
  setUserName: Dispatch<SetStateAction<string>>;
};
