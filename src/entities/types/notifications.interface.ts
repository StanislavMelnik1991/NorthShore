import { IRecipientGroup } from './address.interface';
import { BaseEntity } from './global.interface';
import { IFile } from './image.interface';
import { ILocalizedData } from './localization.interface';
import { IUser } from './user.interface';

export interface INotification extends BaseEntity {
  body: ILocalizedData;
  title: ILocalizedData;
  data_add: number;
  image: IFile | null;
  image_id: IFile['id'] | null;
  need_push: 0 | 1;
  recipient_groups: Array<IRecipientGroup>;
  unread: 0 | 1;
  url: string | null;
  user_id: IUser['id'] | null;
}
