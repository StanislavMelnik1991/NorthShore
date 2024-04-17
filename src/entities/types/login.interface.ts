import { IUser } from './';

export interface ILoginResponse extends IUser {
  token: string;
}
