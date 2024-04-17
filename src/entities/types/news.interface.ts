import { StatusEnum } from '@shared/constants';
import { SortOrder } from '@shared/types';

export type INews = {
  id: number;
  cover?: string;
  user: {
    id: number;
    name: string;
    group: {
      id: number;
      name: string;
    };
    avatar: null;
    status: {
      id: number;
      name: string;
    };
  };
  title: {
    en: string;
    ru: string;
  };
  user_id: number;
  is_draft: 0 | 1;
  status: keyof typeof StatusEnum;
  created_at: number;
  updated_at: number;
  html_content: {
    en: string;
    ru: string;
  };
  published_at: number;
  target_date: number; //number of !!!SECONDS!!! since midnight, January 1, 1970 UTC
  meeting_link: string;
};

export interface INewsFilter {
  status?: keyof typeof StatusEnum;
}

export type INewsSort = { created_at: SortOrder } | { status: SortOrder };
