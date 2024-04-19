import { RequestStatusEnum, RequestThemesEnum } from '@shared/constants';
import { IFile } from './image.interface';
import { IUser } from './user.interface';

export interface IRequest {
  id: number;
  user: IUser;
  files: IFile[];
  title: string;
  theme: {
    id: keyof typeof RequestThemesEnum;
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
  data_add: number;
  theme_id: number;
  files_ids: string;
  status_id: number;
  contact_id: number;
  contact_fio: string;
  contact_phone: string;
}
