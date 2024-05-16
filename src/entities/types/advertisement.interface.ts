import { BaseEntity } from './global.interface';
import { IFile } from './image.interface';

export interface IAdvertisement extends BaseEntity {
  url?: string;
  title: string;
  date_add: number;
  date_start?: number;
  date_finish?: number;
  image_en_id?: IFile['id'];
  image_ru_id?: IFile['id'];
  company_name: string;
  image_en?: IFile;
  image_ru?: IFile;
}
