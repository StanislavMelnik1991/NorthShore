import { BaseEntity } from './global.interface';
import { IFile } from './image.interface';
import { ILocalizedData } from './localization.interface';

export interface ILoyalty extends BaseEntity {
  date_add: number;
  company_name: string;
  company_address: string;
  phone_numbers: Array<string>;
  url: string;
  contact_fio: string;
  contact_phone: string;
  discount_value: string | null;
  body: ILocalizedData;
  title: ILocalizedData;
  image: IFile;
  image_id: IFile['id'];
}

export interface IUserService extends BaseEntity {
  date_add: number;
  company_name: string;
  company_address: string;
  phone_numbers: Array<string>;
  url: string;
  contact_fio: string;
  contact_phone: string;
  body: ILocalizedData;
  title: ILocalizedData;
  image: IFile;
  image_id: IFile['id'];
}
