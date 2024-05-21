import { BaseEntity } from './global.interface';
import { ILocalizedData } from './localization.interface';

export interface IKBaseTheme {
  id: number;
  icon: string;
  name: ILocalizedData;
}

export interface IKBase extends BaseEntity {
  theme_id: IKBaseTheme['id'];
  theme: IKBaseTheme;
  question: ILocalizedData;
  answer: ILocalizedData;
}
