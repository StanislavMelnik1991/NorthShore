import { IRecipientAddressGroup } from './address.interface';
import { BaseEntity } from './global.interface';
import { IFile } from './image.interface';
import { ILocalizedData } from './localization.interface';
import { IUser } from './user.interface';

export interface IAnswer extends BaseEntity {
  body: ILocalizedData;
  question_id: IQuestion['id'];
  votes_count: number;
  percent_result: number;
  users: Array<IUser>;
  image_en?: IFile;
  image_en_id?: IFile['id'];
  image_ru?: IFile;
  image_ru_id?: IFile['id'];
  election_question: {
    id: number;
    body: ILocalizedData;
    election_id: number;
    votes_count: number;
  };
}

export interface IQuestion extends BaseEntity {
  body: ILocalizedData;
  election_id: IVoting['id'];
  votes_count: number;
  answer_variants: Array<IAnswer>;
  chosen_answer_id?: IAnswer['id'];
}

export interface IVoting extends BaseEntity {
  body: ILocalizedData;
  title: ILocalizedData;
  status: BaseEntity;
  status_id: BaseEntity['id'];
  date_add: number;
  date_finish: number;
  need_push: 0 | 1;
  is_archive: 0 | 1;
  show_result: 0 | 1;
  recipient_groups: Array<IRecipientAddressGroup>;
  election_questions: Array<IQuestion>;
}
