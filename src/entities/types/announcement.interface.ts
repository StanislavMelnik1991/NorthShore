import { BaseEntity } from './global.interface';

export interface IDepartment extends BaseEntity {}

export interface IRecipientRolesGroup {
  department: IDepartment;
}

export interface IAnnouncement extends BaseEntity {
  title: string;
  body: string;
  date_add: number;
  recipient_groups: Array<IRecipientRolesGroup>;
}
