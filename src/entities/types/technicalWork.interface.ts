import { ILocalizedData } from './localization.interface';

export interface ITechWork {
  id: number;
  date_start: number;
  date_end: number;
  url?: string;
  body: ILocalizedData;
  title: ILocalizedData;
  type: {
    id: number;
    name: string;
    icon_site: string;
  };
}
