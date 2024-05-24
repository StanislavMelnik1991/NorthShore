import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUserEventsList } from '@features/events';
import { ListParams } from '@entities/types';
import {
  INITIAL_PER_PAGE,
  LanguageEnum,
  NewsStatusEnum,
} from '@shared/constants';

interface Params extends ListParams {
  status?: keyof typeof NewsStatusEnum;
}

export const useEventsListPage = () => {
  const { t, i18n } = useTranslation('events');
  const { getData, isLoading, data, total } = useGetUserEventsList();

  useEffect(() => {
    const newsParams: Params = {
      page: 1,
      perPage: INITIAL_PER_PAGE,
      status: 1,
    };
    getData(newsParams);
  }, [getData]);
  return {
    events: data,
    isLoading,
    t,
    i18n,
    lang: i18n.language as LanguageEnum,
    total,
  };
};
