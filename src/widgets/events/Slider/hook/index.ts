import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUserEventsList } from '@features/events';
import { INewsFilter, INewsSort, ListParams } from '@entities/types';
import { INITIAL_PER_PAGE, LanguageEnum } from '@shared/constants';

interface Props {
  defaultSlide?: number;
}

interface Params extends ListParams {
  sort: INewsSort;
  filter: INewsFilter;
}

export const useEventsSlider = ({ defaultSlide = 0 }: Props) => {
  const { t, i18n } = useTranslation();
  const { getData, isLoading, total, data } = useGetUserEventsList();
  const [slide, setSlide] = useState(defaultSlide);

  useEffect(() => {
    const newsParams: Params = {
      page: 1,
      perPage: INITIAL_PER_PAGE,
      filter: {
        status: 1,
      },
      sort: {
        created_at: 'asc',
      },
    };
    getData(newsParams);
  }, [getData]);
  return {
    events: data,
    t,
    lang: i18n.language as LanguageEnum,
    slide,
    setSlide,
    isLoading,
    total,
  };
};
