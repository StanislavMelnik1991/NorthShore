import { IUserShort } from "./user.types";

export interface ILoginResponse {
  id: number;
  name: string;
  email: string;
  group: {
    id: number;
    name: string;
  };
  token: string;
  avatar: string;
  childs: {
    id: number;
    name: string;
    group: {
      id: number;
      name: string;
    };
    avatar: null;
    childs: Array<IUserShort>;
  }[];
  status: {
    id: number;
    name: string;
  };
  phone_number: string;
  accept_intercom: number;
  account_numbers: {
    id: number;
    account: string;
    user_id: number;
  }[];
}
