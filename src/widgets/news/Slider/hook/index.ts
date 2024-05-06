import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUserNewsList } from '@features/news';
import { INewsFilter, INewsSort, ListParams } from '@entities/types';
import { INITIAL_PER_PAGE, LanguageEnum } from '@shared/constants';

interface Props {
  defaultSlide?: number;
}

export const useNewsSlider = ({ defaultSlide = 0 }: Props) => {
  const { t, i18n } = useTranslation();
  const { getData, isLoading, total, data } = useGetUserNewsList();
  const [slide, setSlide] = useState(defaultSlide);

  interface Params extends ListParams {
    sort: INewsSort;
    filter: INewsFilter;
  }

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
    news: data,
    t,
    lang: i18n.language as LanguageEnum,
    slide,
    setSlide,
    isLoading,
    total,
  };
};
