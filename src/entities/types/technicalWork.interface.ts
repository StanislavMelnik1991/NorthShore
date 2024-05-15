import { IRecipientAddressGroup } from './address.interface';
import { BaseEntity } from './global.interface';
import { ILocalizedData } from './localization.interface';
import { IEmployee } from './user.interface';

export interface ITechWorkType extends BaseEntity {
  icon_site: string;
  icon_mobile?: string;
}
export interface ITechNature extends BaseEntity {}
export interface ITechStatus extends BaseEntity {}
export interface ITechConfig {
  copyrights?: string;
  debug: boolean;
  logo?: string;
  main_url?: string;
  news_url?: string;
  secret_key?: string;
  title?: string;
  user_cover?: string;
}

export interface ITechWork extends BaseEntity {
  body: ILocalizedData;
  config: ITechConfig;
  date_add: number;
  date_end: number;
  date_start: number;
  is_archive: 0 | 1;
  nature: ITechNature;
  nature_id: ITechNature['id'];
  need_push: 0 | 1 | null;
  recipient_groups: Array<IRecipientAddressGroup>;
  responsible: IEmployee;
  responsible_id: IEmployee['id'];
  status: ITechStatus;
  status_id: ITechStatus['id'];
  title: ILocalizedData;
  type: ITechWorkType;
  type_id: ITechWorkType['id'];
  url?: string;
}
