import { LanguageEnum } from '@shared/constants';
import { BaseEntity } from './global.interface';
import { IRole } from './roles.interface';

export interface IUserShort extends BaseEntity {
  group: BaseEntity;
  avatar?: string;
  childs: Array<IUserShort>;
  lang: LanguageEnum;
}

export interface IUser extends IUserShort {
  status: BaseEntity;
  phone_number: string;
  email: string;
  accept_intercom?: number;
  role: IRole | null;
  account_numbers: {
    id: number;
    user_id: number;
    account: string;
    apartment_id: number;
    apartment: {
      id: number;
      name: string;
      entrance_id: number;
      comment: string;
      entrance: {
        id: number;
        name: string;
        building_id: number;
        comment: string;
        building: {
          id: number;
          name: string;
          street_id: number;
          building_type_id: number;
          comment: string;
          street: {
            id: number;
            name: string;
          };
        };
      };
    };
  }[];
  parent?: IParent;
}

export interface IParent extends BaseEntity {
  group: BaseEntity;
  avatar: string;
  parent?: IParent;
}
