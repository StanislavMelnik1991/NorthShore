import { BaseEntity } from './global.interface';

export interface IFile extends BaseEntity {
  url: string;
  size: number;
  user_id: number;
  data_add: number;
  filename: string;
}
