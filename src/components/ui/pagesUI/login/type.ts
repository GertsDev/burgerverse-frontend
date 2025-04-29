import { Dispatch, SetStateAction } from 'react';
import { PageUIProps } from '../../../../pages/common-type';

export type LoginUIProps = PageUIProps & {
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
};
