export interface IUserShort {
  id: number;
  name: string;
  group: {
    id: number;
    name: string;
  };
  avatar: string;
  childs: Array<IUserShort>;
}

export interface IUser extends IUserShort {
  status: {
    id: number;
    name: string;
  };
  phone_number: string;
  email: string;
  accept_intercom: number;
  account_numbers: {
    id: number;
    user_id: number;
    account: string;
    apartment_id: number;
    apartment: number;
  }[];
  parent?: IParent;
}

export interface IParent {
  id: number;
  name: string;
  group: {
    id: number;
    name: string;
  };
  avatar: string;
  parent?: IParent;
}
