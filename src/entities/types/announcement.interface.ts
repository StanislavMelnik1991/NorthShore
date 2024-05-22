import { IDepartment } from './employees.interface';
import { BaseEntity } from './global.interface';

export interface IRecipientRolesGroup {
  department: IDepartment;
}

export interface IAnnouncement extends BaseEntity {
  title: string;
  body: string;
  date_add: number;
  recipient_groups: Array<IRecipientRolesGroup>;
}
