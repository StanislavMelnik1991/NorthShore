import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUserNewsList } from '@features/news';
import { ListParams } from '@entities/types';
import {
  INITIAL_PER_PAGE,
  LanguageEnum,
  NewsStatusEnum,
} from '@shared/constants';

interface Props {
  defaultSlide?: number;
}

export const useNewsSlider = ({ defaultSlide = 0 }: Props) => {
  const { t, i18n } = useTranslation();
  const { getData, isLoading, total, data } = useGetUserNewsList();
  const [slide, setSlide] = useState(defaultSlide);

  interface Params extends ListParams {
    status?: keyof typeof NewsStatusEnum;
  }

  useEffect(() => {
    const newsParams: Params = {
      page: 1,
      perPage: INITIAL_PER_PAGE,
      status: 1,
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
