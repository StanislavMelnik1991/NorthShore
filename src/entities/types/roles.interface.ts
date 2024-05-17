import { BaseEntity } from './global.interface';

export interface IAccessCode extends BaseEntity {
  section_name: string;
}

export interface IRole extends BaseEntity {
  description: string;
  access_codes: Array<IAccessCode>;
  users: Array<BaseEntity>;
}
