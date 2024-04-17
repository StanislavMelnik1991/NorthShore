import { RequestStatusEnum } from '@shared/constants';
import { IUser } from './user.interface';

export interface IRequest {
  id: number;
  user: IUser;
  files: never[];
  theme: {
    id: number;
    name: string;
  };
  status: {
    id: keyof typeof RequestStatusEnum;
    name: string;
  };
  comment: string;
  contact: {
    id: number;
    name: string;
  };
  content: string;
  user_id: number;
  data_add: string;
  theme_id: number;
  files_ids: string;
  status_id: number;
  contact_id: number;
  contact_fio: string;
  contact_phone: string;
}
