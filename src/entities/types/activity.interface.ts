import { NewsStatusEnum } from '@shared/constants';
import { IRecipientAddressGroup } from './address.interface';
import { BaseEntity } from './global.interface';
import { ILocalizedData } from './localization.interface';
import { IUser } from './user.interface';
import { IQuestion } from './voting.interface';

export interface IActivity {
  id: number;
  date_add?: number;
  date_finish?: number;
  recipient_groups?: Array<IRecipientAddressGroup>;
  need_push?: 0 | 1;
  status_id?: BaseEntity['id'];
  is_archive?: 0 | 1;
  show_result?: 0 | 1;
  body?: ILocalizedData;
  title: ILocalizedData;
  status: keyof typeof NewsStatusEnum;
  election_questions?: Array<IQuestion>;
  target_date?: number;
  user_id?: number;
  created_at?: number;
  updated_at?: number;
  published_at?: number;
  is_meeting: 0 | 1;
  meeting_link?: string;
  user?: IUser;
}
