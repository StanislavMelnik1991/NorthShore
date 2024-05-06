import { BaseEntity } from './global.interface';

export interface IRole extends BaseEntity {
  access: Array<number> | null;
}

export interface IUserShort extends BaseEntity {
  group: BaseEntity;
  avatar: string;
  childs: Array<IUserShort>;
}

export interface IUser extends IUserShort {
  status: BaseEntity;
  phone_number: string;
  email: string;
  accept_intercom?: number;
  role: IRole;
  account_numbers: {
    id: number;
    user_id: number;
    account: string;
    apartment_id: number;
    apartment: number;
  }[];
  parent?: IParent;
}

export interface IParent extends BaseEntity {
  group: BaseEntity;
  avatar: string;
  parent?: IParent;
}
